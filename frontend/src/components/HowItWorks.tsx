'use client';

import Link from 'next/link';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Tell Us About Yourself',
      description: 'Share your name, role, and what you offer. Are you a freelancer, agency, or startup founder? We\'ve got you covered.',
    },
    {
      number: '02',
      title: 'Describe Your Prospect',
      description: 'Enter the prospect\'s name, company, and industry. Add any specific context you want the email to address.',
    },
    {
      number: '03',
      title: 'Copy & Send',
      description: 'Your personalized, human-sounding email is generated instantly. Copy it and send — it\'s that simple.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 text-gray-300 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span>↗</span>
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Three Steps to a Better Email
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            No learning curve. No long setup. Just results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px border-t-2 border-dashed border-slate-700 z-0" />
              )}
              
              {/* Step Number */}
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 relative z-10">
                {step.number}
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-8 rounded-lg transition-colors"
          >
            Try It Now — It&apos;s Free
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
