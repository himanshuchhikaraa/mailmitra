'use client';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "I was spending 30 minutes crafting each cold email. With MailMitra, it takes 2 minutes. And my response rate actually improved because the emails sound like me, not a robot.",
      name: 'Priya Sharma',
      role: 'Freelance Developer, Pune',
      initials: 'PS',
      bgColor: 'bg-purple-500',
    },
    {
      quote: "As a startup founder trying to reach investors, the tone matters a lot. MailMitra helped me write emails that are confident but not pushy. Got 3 meetings in my first week!",
      name: 'Arjun Mehta',
      role: 'Co-founder, Mumbai',
      initials: 'AM',
      bgColor: 'bg-blue-500',
    },
    {
      quote: "Our team was spending too much time on outreach copy. Now we use MailMitra for all our cold emails. The cultural nuance it adds is exactly what our Indian business clients need.",
      name: 'Sneha Reddy',
      role: 'Digital Marketing Agency, Hyderabad',
      initials: 'SR',
      bgColor: 'bg-green-500',
    },
    {
      quote: "The Formal tone option is perfect for reaching corporate clients. The emails feel polished and respectful without being stiff. Highly recommend for any consultant.",
      name: 'Rahul Kapoor',
      role: 'Business Consultant, Delhi',
      initials: 'RK',
      bgColor: 'bg-orange-500',
    },
  ];

  return (
    <section id="reviews" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span>⭐</span>
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Loved by Indian Professionals
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Real results from real people across India.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${testimonial.bgColor} rounded-full flex items-center justify-center text-white text-sm font-semibold`}>
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
