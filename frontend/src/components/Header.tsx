'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isGeneratePage = pathname === '/generate';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-bold text-xl">
              <span className="text-white">Mail</span>
              <span className="text-orange-500">Mitra</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Features
            </Link>
            <Link href="/#how-it-works" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              How It Works
            </Link>
            <Link href="/#reviews" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Reviews
            </Link>
          </nav>

          {/* CTA Button */}
          {isGeneratePage ? (
            <Link
              href="/"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-2"
            >
              <span>←</span> Back to Home
            </Link>
          ) : (
            <Link
              href="/generate"
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2.5 px-5 rounded-lg transition-colors"
            >
              Start Writing Free
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
