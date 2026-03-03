'use client';

export default function Footer() {
  return (
    <footer className="bg-slate-900 py-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-bold text-xl">
              <span className="text-white">Mail</span>
              <span className="text-orange-500">Mitra</span>
            </span>
          </div>

          {/* Tagline */}
          <p className="text-gray-400 text-sm text-center">
            Made with ❤️ for Indian professionals. Clear, human outreach — every time.
          </p>

          {/* India Badge */}
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>🇮🇳</span>
            <span>Proudly Indian</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 MailMitra. Built for the bold, the ambitious, and the hard-working professionals of India.
          </p>
        </div>
      </div>
    </footer>
  );
}
