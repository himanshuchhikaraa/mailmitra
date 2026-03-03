'use client';

export default function ProblemSection() {
  const typicalProblems = [
    'Sound generic and copy-paste',
    'Are too aggressive or salesy',
    'Feel automated and impersonal',
    'Ignore Indian business etiquette',
    'Take way too long to write',
  ];

  const mailMitraBenefits = [
    'Context-aware and specific to your prospect',
    'Warm, respectful, and never pushy',
    'Sounds like a real human wrote it',
    'Tuned for Indian professional culture',
    'Ready in under 60 seconds',
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Most Cold Emails Fail
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            The same mistakes, over and over again. MailMitra fixes every single one.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Typical Cold Emails */}
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-red-500 text-xl">✕</span>
              <h3 className="text-xl font-semibold text-gray-900">Typical Cold Emails</h3>
            </div>
            <ul className="space-y-4">
              {typicalProblems.map((problem, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-600">{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* MailMitra Emails */}
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">MailMitra Emails</h3>
            </div>
            <ul className="space-y-4">
              {mailMitraBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
