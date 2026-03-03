'use client';

import { useState, useCallback } from 'react';
import { generateEmail, EmailInput, GeneratedEmail } from '@/lib/api';

export default function EmailGenerator() {
  const [formData, setFormData] = useState<EmailInput>({
    prospectName: '',
    companyName: '',
    companyContext: '',
    yourName: '',
    yourService: '',
    yourCompany: '',
    indianMode: true,
  });
  
  const [generatedEmail, setGeneratedEmail] = useState<GeneratedEmail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({ ...prev, indianMode: !prev.indianMode }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setGeneratedEmail(null);

    const response = await generateEmail(formData);

    if (response.success && response.data) {
      setGeneratedEmail(response.data);
      if (response.remaining !== undefined) {
        setRemaining(response.remaining);
      }
    } else {
      setError(response.message || 'Failed to generate email. Please try again.');
    }

    setLoading(false);
  };

  const copyToClipboard = useCallback(async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      console.error('Failed to copy');
    }
  }, []);

  return (
    <section id="generator" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Generate Your Cold Email
          </h2>
          <p className="text-lg text-gray-600">
            Fill in the details and get a personalized email in seconds
          </p>
          {remaining !== null && (
            <p className="text-sm text-blue-600 mt-2">
              {remaining} free email{remaining !== 1 ? 's' : ''} remaining today
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Prospect Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Prospect Details</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="prospectName" className="block text-sm font-medium text-gray-700 mb-1">
                      Prospect Name *
                    </label>
                    <input
                      type="text"
                      id="prospectName"
                      name="prospectName"
                      value={formData.prospectName}
                      onChange={handleChange}
                      placeholder="e.g., Rahul Sharma"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g., TechStart Solutions"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="companyContext" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Context <span className="text-gray-400">(optional)</span>
                    </label>
                    <textarea
                      id="companyContext"
                      name="companyContext"
                      value={formData.companyContext}
                      onChange={handleChange}
                      placeholder="e.g., They run an e-commerce store selling organic products, based in Mumbai"
                      rows={2}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Your Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Details</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="yourName" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="yourName"
                      name="yourName"
                      value={formData.yourName}
                      onChange={handleChange}
                      placeholder="e.g., Priya Patel"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="yourService" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Service *
                    </label>
                    <input
                      type="text"
                      id="yourService"
                      name="yourService"
                      value={formData.yourService}
                      onChange={handleChange}
                      placeholder="e.g., SEO and content marketing for e-commerce brands"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="yourCompany" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Company <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="yourCompany"
                      name="yourCompany"
                      value={formData.yourCompany}
                      onChange={handleChange}
                      placeholder="e.g., GrowthBox Digital"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* India Mode Toggle */}
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇮🇳</span>
                  <div>
                    <p className="font-medium text-gray-900">India Mode</p>
                    <p className="text-sm text-gray-600">Polite tone, cultural context</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleToggle}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    formData.indianMode ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      formData.indianMode ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 disabled:shadow-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating...
                  </span>
                ) : (
                  'Generate Email'
                )}
              </button>
            </form>
          </div>

          {/* Output */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Generated Email</h3>
            
            {!generatedEmail ? (
              <div className="h-full flex items-center justify-center text-gray-400 min-h-[400px]">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p>Your generated email will appear here</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Subject Line */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Subject Line</label>
                    <button
                      onClick={() => copyToClipboard(generatedEmail.subject, 'subject')}
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      {copiedField === 'subject' ? (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg text-gray-800 font-medium">
                    {generatedEmail.subject}
                  </div>
                </div>

                {/* Email Body */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Email Body</label>
                    <button
                      onClick={() => copyToClipboard(generatedEmail.body, 'body')}
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      {copiedField === 'body' ? (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg text-gray-800 whitespace-pre-wrap">
                    {generatedEmail.body}
                  </div>
                </div>

                {/* Follow-up */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Follow-up Email (send in 3-4 days)</label>
                    <button
                      onClick={() => copyToClipboard(generatedEmail.followUp, 'followUp')}
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      {copiedField === 'followUp' ? (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg text-gray-800 whitespace-pre-wrap">
                    {generatedEmail.followUp}
                  </div>
                </div>

                {/* Copy All Button */}
                <button
                  onClick={() => copyToClipboard(
                    `Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}\n\n---\nFollow-up:\n${generatedEmail.followUp}`,
                    'all'
                  )}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {copiedField === 'all' ? (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      All Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy All
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
