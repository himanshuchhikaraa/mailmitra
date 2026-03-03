'use client';

export default function WhoItsFor() {
  const audiences = [
    {
      title: 'Freelance Developers & Designers',
      description: 'Reach startups and SMBs without sounding like a mass mailer.',
    },
    {
      title: 'Digital Marketing Agencies',
      description: 'Win more clients with outreach that feels personal and relevant.',
    },
    {
      title: 'Startup Founders',
      description: 'Connect with investors, partners, and early customers authentically.',
    },
    {
      title: 'Consultants & Advisors',
      description: 'Position yourself as a peer, not a vendor, from the first email.',
    },
    {
      title: 'Sales & BD Professionals',
      description: 'Increase your open and response rates without changing your CRM.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span>👥</span>
              Who It&apos;s For
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              Made for Every Indian Professional Who Reaches Out Cold
            </h2>

            <ul className="space-y-6">
              {audiences.map((audience, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{audience.title}</h3>
                    <p className="text-gray-500 text-sm">{audience.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content - Testimonial Image Card */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              {/* Placeholder image - you can replace with actual image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-300 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm">Professional at work</span>
                  </div>
                </div>
                
                {/* Testimonial Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent p-6">
                  <p className="text-white font-medium mb-2">
                    &quot;MailMitra helped me land 3 clients in my first week of outreach.&quot;
                  </p>
                  <p className="text-gray-400 text-sm">
                    — Arjun Mehta, Startup Founder, Mumbai
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
