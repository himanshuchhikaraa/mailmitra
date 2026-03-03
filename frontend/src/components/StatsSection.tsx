'use client';

export default function StatsSection() {
  const stats = [
    { number: '500+', label: 'Professionals Using MailMitra' },
    { number: '10,000+', label: 'Emails Generated' },
    { number: '38%', label: 'Avg. Reply Rate Improvement' },
    { number: '< 60s', label: 'Email Generated in' },
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
