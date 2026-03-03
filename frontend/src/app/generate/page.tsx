'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const roles = [
  { value: '', label: 'Select your role...' },
  { value: 'Freelancer', label: 'Freelancer' },
  { value: 'Agency Owner', label: 'Agency Owner' },
  { value: 'Startup Founder', label: 'Startup Founder' },
  { value: 'Consultant', label: 'Consultant' },
  { value: 'Sales Professional', label: 'Sales Professional' },
  { value: 'Business Development', label: 'Business Development' },
  { value: 'Marketing Professional', label: 'Marketing Professional' },
  { value: 'Other', label: 'Other' },
];

const industries = [
  { value: '', label: 'Select their industry...' },
  { value: 'Technology', label: 'Technology' },
  { value: 'E-commerce', label: 'E-commerce' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Education', label: 'Education' },
  { value: 'Real Estate', label: 'Real Estate' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Hospitality', label: 'Hospitality' },
  { value: 'Logistics', label: 'Logistics' },
  { value: 'Marketing & Advertising', label: 'Marketing & Advertising' },
  { value: 'Other', label: 'Other' },
];

const purposes = [
  { value: '', label: 'Select the email purpose...' },
  { value: 'Introduction', label: 'Introduction' },
  { value: 'Follow-up', label: 'Follow-up' },
  { value: 'Partnership', label: 'Partnership' },
  { value: 'Service Offer', label: 'Service Offer' },
  { value: 'Collaboration', label: 'Collaboration' },
];

const tones = [
  { value: 'professional', label: 'Professional', description: 'Confident & clear' },
  { value: 'friendly', label: 'Friendly', description: 'Warm & conversational' },
  { value: 'formal', label: 'Formal', description: 'Respectful & structured' },
];

export default function GeneratePage() {
  const [formData, setFormData] = useState({
    yourName: '',
    yourRole: '',
    yourService: '',
    prospectName: '',
    companyName: '',
    industry: '',
    purpose: '',
    tone: 'professional',
    additionalContext: '',
  });

  const [generatedEmail, setGeneratedEmail] = useState<{
    subject: string;
    body: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedSubject, setCopiedSubject] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToneSelect = (tone: string) => {
    setFormData(prev => ({ ...prev, tone }));
  };

  const validateForm = () => {
    if (!formData.yourName.trim()) return 'Your name is required';
    if (!formData.yourRole) return 'Your role is required';
    if (!formData.yourService.trim()) return 'Your service is required';
    if (!formData.prospectName.trim()) return "Prospect's name is required";
    if (!formData.companyName.trim()) return 'Company name is required';
    if (!formData.industry) return 'Industry is required';
    if (!formData.purpose) return 'Email purpose is required';
    if (!formData.tone) return 'Tone is required';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedEmail(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/email/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          yourName: formData.yourName,
          yourRole: formData.yourRole,
          yourService: formData.yourService,
          prospectName: formData.prospectName,
          companyName: formData.companyName,
          industry: formData.industry,
          purpose: formData.purpose,
          tone: formData.tone,
          additionalContext: formData.additionalContext,
          indiaMode: true,
        }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate email');
      }

      // API returns data nested inside 'data' object
      const emailData = data.data;
      console.log('Setting email:', { subject: emailData.subject, body: emailData.body });
      setGeneratedEmail({
        subject: emailData.subject,
        body: emailData.body,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySubject = async () => {
    if (generatedEmail?.subject) {
      await navigator.clipboard.writeText(generatedEmail.subject);
      setCopiedSubject(true);
      setTimeout(() => setCopiedSubject(false), 2000);
    }
  };

  const handleCopyEmail = async () => {
    if (generatedEmail) {
      const fullEmail = `Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`;
      await navigator.clipboard.writeText(fullEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRegenerate = () => {
    handleSubmit(new Event('submit') as unknown as React.FormEvent);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span>✨</span>
            Smart Email Generator
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Generate Your Cold Email
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Fill in your details and we&apos;ll craft a personalized, culturally-aware cold email in seconds.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form - Left Side */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* About You Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-500">👤</span>
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">About You</h2>
                      <p className="text-sm text-gray-500">Tell us who you are</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="yourName"
                        value={formData.yourName}
                        onChange={handleInputChange}
                        placeholder="e.g. Aditya Kumar"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Role <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="yourRole"
                        value={formData.yourRole}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all appearance-none cursor-pointer"
                      >
                        {roles.map(role => (
                          <option key={role.value} value={role.value}>{role.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What You Offer / Your Service <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="yourService"
                        value={formData.yourService}
                        onChange={handleInputChange}
                        placeholder="e.g. React development, SEO services, business consulting"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* About Your Prospect Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-500">🎯</span>
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">About Your Prospect</h2>
                      <p className="text-sm text-gray-500">Who are you reaching out to?</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prospect&apos;s First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="prospectName"
                          value={formData.prospectName}
                          onChange={handleInputChange}
                          placeholder="e.g. Rahul"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="e.g. TechCorp India"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Their Industry <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all appearance-none cursor-pointer"
                      >
                        {industries.map(ind => (
                          <option key={ind.value} value={ind.value}>{ind.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Email Settings Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-500">⚙️</span>
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">Email Settings</h2>
                      <p className="text-sm text-gray-500">Define the email&apos;s purpose and tone</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purpose of This Email <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all appearance-none cursor-pointer"
                      >
                        {purposes.map(p => (
                          <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tone <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {tones.map(tone => (
                          <button
                            key={tone.value}
                            type="button"
                            onClick={() => handleToneSelect(tone.value)}
                            className={`p-4 rounded-lg border-2 text-left transition-all ${
                              formData.tone === tone.value
                                ? 'border-orange-500 bg-orange-50'
                                : 'border-gray-200 hover:border-orange-300'
                            }`}
                          >
                            <div className="font-medium text-gray-900">{tone.label}</div>
                            <div className="text-sm text-gray-500">{tone.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Context (Optional)
                      </label>
                      <textarea
                        name="additionalContext"
                        value={formData.additionalContext}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Any specific point you want to mention? e.g. 'I noticed they recently launched a new product' or 'We have a mutual connection — Amit Sharma'"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <span>ℹ️</span>
                        Adding specific context makes your email significantly more personal and effective.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <span>✨</span>
                      Generate My Email
                      <span>→</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Email Preview - Right Side */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                {generatedEmail ? (
                  /* Generated Email Display */
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-orange-500 px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white">
                        <span>✉️</span>
                        <span className="font-semibold">Your Email is Ready!</span>
                      </div>
                      <button
                        onClick={handleRegenerate}
                        className="text-white/80 hover:text-white text-sm flex items-center gap-1 transition-colors"
                      >
                        <span>🔄</span>
                        Regenerate
                      </button>
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Subject Line */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Subject Line</span>
                          <button
                            onClick={handleCopySubject}
                            className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
                          >
                            {copiedSubject ? '✓ Copied' : '📋 Copy'}
                          </button>
                        </div>
                        <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-800 font-medium">
                          {generatedEmail.subject}
                        </div>
                      </div>

                      {/* Email Body */}
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email Body</span>
                        <div className="mt-2 bg-gray-50 rounded-lg px-4 py-4 text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {generatedEmail.body}
                        </div>
                      </div>

                      {/* Copy Full Email Button */}
                      <button
                        onClick={handleCopyEmail}
                        className="w-full py-3 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        {copied ? (
                          <>
                            <span>✓</span>
                            Copied to Clipboard!
                          </>
                        ) : (
                          <>
                            <span>📋</span>
                            Copy Full Email
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Empty State */
                  <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Your Email Preview</h3>
                    <p className="text-gray-500 text-sm mb-6">
                      Fill in your details and click &quot;Generate My Email&quot; to see your personalized cold email here.
                    </p>

                    {/* Quick Tips */}
                    <div className="text-left bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-yellow-500">💡</span>
                        <span className="font-medium text-gray-700 text-sm">Quick Tips</span>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          Use the prospect&apos;s first name only
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          Add specific context for better emails
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          Regenerate for a fresh variation
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          Keep your service offering concise
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
