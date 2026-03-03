'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Will this sound robotic?',
    answer: 'No. MailMitra is specifically trained to write like a human. We avoid AI-sounding phrases, buzzwords, and generic templates. Every email is conversational and natural.',
  },
  {
    question: 'Is this spam?',
    answer: 'Not at all. MailMitra helps you write personalized, one-to-one emails. It\'s not a mass email tool. You\'re still sending individual emails — we just help you write them faster and better.',
  },
  {
    question: 'Can I use this for LinkedIn DMs?',
    answer: 'Absolutely! The emails generated work perfectly for LinkedIn messages too. Just copy the body (without the subject line) and use it as your connection request note or direct message.',
  },
  {
    question: 'Is my data stored?',
    answer: 'For free users, we only store usage counts (not email content). Your prospect details and generated emails are not saved on our servers. Pro users (coming soon) will have optional history saving.',
  },
  {
    question: 'What makes this different from ChatGPT?',
    answer: 'MailMitra is specifically fine-tuned for Indian B2B cold outreach. It understands Indian business culture, uses appropriate tone, and keeps emails short. You don\'t need to write complex prompts — just fill the form.',
  },
  {
    question: 'How many emails can I generate for free?',
    answer: 'You get 5 free emails every day. The limit resets at midnight IST. No credit card required, no sign-up needed for free tier.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
