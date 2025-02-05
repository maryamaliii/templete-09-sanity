"use client";
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // Create Payment Intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret } = await response.json();

      // Confirm Payment
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message || 'Payment failed');
        toast.error(paymentResult.error.message || 'Payment failed');
      } else {
        setError(null);
        toast.success(
          <div>
            <h2 className="font-bold text-lg">🎉 Payment Successful!</h2>
            <p className="text-sm">Thank you for your purchase. Your order is being processed.</p>
            <p className="text-sm mt-2">Food tuck: Hungry for more? Check out our exclusive deals on desserts and combos!</p>
          </div>
        );
        router.push('/payment-success');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setError('An unknown error occurred during payment.');
        toast.error('An unknown error occurred during payment.');
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
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
              invalid: { color: '#9e2146' },
            },
          }}
          className="p-3 border rounded-lg"
        />
      </div>

      {error && (
        <div className="text-red-500 mb-4 text-center">
          <p>{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>Your payment is secure and encrypted.</p>
        <p>We do not store your card details.</p>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact Support</a></p>
      </div>
    </form>
  );
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}
