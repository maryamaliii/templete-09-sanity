"use client";
import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold mb-6">🎉 Payment Successful!</h1>
        <p className="text-lg mb-6">Thank you for your purchase. Your order is being processed.</p>
        <Link href="/generate-tracking">
          <button className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors">
            Proceed to Shipment
          </button>
        </Link>
      </div>
    </div>
  );
}