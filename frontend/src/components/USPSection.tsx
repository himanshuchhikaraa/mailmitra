'use client';

export default function USPSection() {
  const features = [
    {
      icon: '❤️',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-500',
      title: 'Culturally Aware',
      description: 'Emails crafted with the warmth and respect that Indian business relationships demand — no cold, robotic templates.',
    },
    {
      icon: '🎯',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-500',
      title: 'Laser Personalized',
      description: "Every email is tailored to your role, your prospect's industry, and the specific goal you want to achieve.",
    },
    {
      icon: '✨',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-500',
      title: 'Ready in Seconds',
      description: "Fill in a few details and get a complete, send-ready email instantly. No more staring at a blank page.",
    },
    {
      icon: '💬',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-500',
      title: 'Multiple Tones',
      description: "Choose from Professional, Friendly, or Formal — MailMitra matches your voice and the situation perfectly.",
    },
    {
      icon: '🛡️',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-500',
      title: 'Never Spammy',
      description: "Every email is short, clear, and respectful. We help you open doors, not slam them shut with aggressive pitches.",
    },
    {
      icon: '⏱️',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      title: 'Save Hours Weekly',
      description: "Stop spending hours crafting outreach copy. Use that time to close deals, build products, or serve your clients better.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span>✨</span>
            Powerful Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Better Outreach
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            MailMitra combines smart templates with cultural intelligence to make every email count.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-orange-200 hover:shadow-md transition-all duration-200"
            >
              <div className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center text-xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
