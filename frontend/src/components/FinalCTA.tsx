'use client';

import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Card */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl p-12 text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Start Your First Email in 60 Seconds
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            No sign-up required. No credit card. Just fill in your details and get a send-ready email instantly.
          </p>
          
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 text-lg"
          >
            Generate My Email — Free
            <span>→</span>
          </Link>
          
          <p className="text-sm text-gray-500 mt-6">
            Free forever. No account needed. 10,000+ emails generated.
          </p>
        </div>
      </div>
    </section>
  );
}
