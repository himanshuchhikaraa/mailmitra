'use client';

import Link from 'next/link';

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple Pricing
          </h2>
          <p className="text-lg text-gray-600">
            Start free, upgrade when you need more
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Plan */}
          <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free</h3>
              <div className="text-4xl font-bold text-gray-900">
                ₹0
                <span className="text-lg font-normal text-gray-500">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                5 emails per day
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Subject line + email + follow-up
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                India mode
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                No history saved
              </li>
            </ul>

            <Link
              href="#generator"
              className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Start Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-blue-600 rounded-2xl p-8 border-2 border-blue-600 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-400 text-white text-sm font-medium px-4 py-1 rounded-full">
              Most Popular
            </div>

            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
              <div className="text-4xl font-bold text-white">
                ₹199
                <span className="text-lg font-normal text-blue-200">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-white">
                <svg className="w-5 h-5 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited emails
              </li>
              <li className="flex items-center gap-3 text-white">
                <svg className="w-5 h-5 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save email history
              </li>
              <li className="flex items-center gap-3 text-white">
                <svg className="w-5 h-5 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Advanced follow-up generator
              </li>
              <li className="flex items-center gap-3 text-white">
                <svg className="w-5 h-5 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Priority AI quality
              </li>
            </ul>

            <button
              className="block w-full text-center bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
