'use client';

import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Sign Up"
        currentPage="Sign Up"
      />

      {/* Signup Form */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-md bg-white shadow-xl rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-8 text-center">Create Account</h3>
          <form className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#FF9F0D] focus:border-[#FF9F0D] outline-none transition-colors"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#FF9F0D] focus:border-[#FF9F0D] outline-none transition-colors"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-[#FF9F0D] focus:border-[#FF9F0D] outline-none transition-colors"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember"
                className="w-4 h-4 text-[#FF9F0D] border-gray-300 rounded focus:ring-[#FF9F0D]" 
              />
              <label htmlFor="remember" className="ml-2 text-gray-700">Remember me</label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF9F0D] hover:bg-[#e8890b] text-white font-bold py-3 rounded-md transition-colors duration-300"
            >
              Sign Up
            </button>
            <div className="text-center">
              <Link 
                href="/forgot-password" 
                className="text-[#FF9F0D] hover:text-[#e8890b] transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </form>

          <div className="mt-8 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 border border-gray-300 rounded-md shadow-sm transition-colors duration-300 flex items-center justify-center space-x-2">
                <Image src="/google.png" alt="Google" width={20} height={20} />
                <span>Sign up with Google</span>
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 border border-gray-300 rounded-md shadow-sm transition-colors duration-300 flex items-center justify-center space-x-2">
                <Image src="/apple.png" alt="Apple" width={20} height={20} />
                <span>Sign up with Apple</span>
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-[#FF9F0D] hover:text-[#e8890b] font-medium transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
} 