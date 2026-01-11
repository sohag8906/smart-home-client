import React from 'react';

const About = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Heading Section */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-[#DB995A] to-orange-400 p-1 rounded-full mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-full px-6 py-1">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">About Our Journey</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            About <span className="text-green-600 dark:text-green-400">SmartHome</span>
            <span className="text-[#DB995A]">Decor</span>
          </h1>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed bg-gradient-to-r from-gray-50 to-[#DB995A]/10 dark:from-gray-800 dark:to-[#DB995A]/20 p-6 rounded-2xl border-l-4 border-green-500">
              Enjoy fast, reliable decoration services with real-time coordination and zero hassle.
              From home decoration to weddings and ceremonies — we deliver on time, every time.
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
          {['Story', 'Mission', 'Success', 'Team & Others'].map((tab, index) => (
            <button
              key={tab}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                index === 0 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200 dark:shadow-green-900' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-green-600 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-green-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Story Content Card */}
        <div className="relative mb-16">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-[#DB995A] rounded-3xl blur opacity-20"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 lg:p-16 transition-colors duration-300">
            <div className="flex items-center mb-8">
              <div className="w-3 h-10 bg-green-500 rounded-full mr-4"></div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Our Story</h3>
            </div>
            
            <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              <p className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border-l-4 border-[#DB995A]">
                We started with a simple promise — to make decoration services fast,
                reliable, and stress-free. Over the years, our commitment to planning,
                coordination, and customer-first service has made us a trusted partner
                for thousands.
              </p>

              <div className="flex items-start">
                <div className="text-green-500 text-2xl mr-4">✦</div>
                <p>
                  Whether it's a home makeover, wedding, or corporate event, our expert
                  team works closely with clients to understand their vision and bring
                  it to life with precision and creativity.
                </p>
              </div>

              <p className="bg-gradient-to-r from-green-50 dark:from-green-900 to-white dark:to-gray-800 p-6 rounded-xl border border-green-100 dark:border-green-700">
                With <span className="font-bold text-green-600 dark:text-green-400">SmartHome Decor</span>,
                you don't just book a service — you get a complete experience from
                planning to execution, ensuring perfection in every detail.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
            Our <span className="text-green-600 dark:text-green-400">Achievements</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: "5K+", label: "Happy Clients", color: "text-green-600 dark:text-green-400" },
              { value: "1K+", label: "Events Completed", color: "text-[#DB995A] dark:text-[#DB995A]/80" },
              { value: "10+", label: "Years Experience", color: "text-green-600 dark:text-green-400" },
              { value: "24/7", label: "Support", color: "text-[#DB995A] dark:text-[#DB995A]/80" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 hover:border-green-200"
              >
                <h4 className={`text-4xl md:text-5xl font-bold ${stat.color} mb-3`}>
                  {stat.value}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</p>
                <div className={`h-1 w-16 mx-auto mt-4 rounded-full ${stat.color.includes('green') ? 'bg-green-500' : 'bg-[#DB995A]'}`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700"></div>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full"></div>
          
          <div className="relative p-10 md:p-14 text-center text-white">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <span className="font-semibold">Let's Create Something Beautiful</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Space?
            </h3>
            
            <p className="text-green-100 dark:text-green-200 text-lg max-w-2xl mx-auto mb-8">
              Let's bring your vision to life with expert planning and flawless execution.
              Your dream decoration is just a click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-white dark:bg-gray-100 text-green-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Us Now
              </a>
              
              <a
                href="/portfolio"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white dark:border-gray-200 text-white dark:text-gray-100 font-bold px-8 py-4 rounded-xl hover:bg-white/10 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                View Our Portfolio
              </a>
            </div>
            
            <p className="mt-8 text-green-100 dark:text-green-200 text-sm">
              ✨ Free consultation available | 100% Satisfaction Guarantee
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
