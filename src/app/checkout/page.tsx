"use client";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not loaded. Please try again.");
      return;
    }

    setLoading(true);

    try {
      // Create Payment Intent
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1000 }), // $10.00
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret } = await response.json();

      // Get card details
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        toast.error("Card details not found. Please try again.");
        setLoading(false);
        return;
      }

      // Confirm Payment
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (paymentResult.error) {
        toast.error(paymentResult.error.message || "Payment failed");
      } else {
        toast.success("🎉 Payment Successful! Your order is being processed.");
        router.push("/payment-success");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred during payment.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Payment Details</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Card Information</label>
        <CardElement
          options={{
            style: {
              base: { fontSize: "16px", color: "#424770", "::placeholder": { color: "#aab7c4" } },
              invalid: { color: "#9e2146" },
            },
          }}
          className="p-3 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
