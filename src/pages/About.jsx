import React from 'react';

const About = () => {
    return (
        <div className='mt-10 max-w-4xl mx-auto px-6'>
            
           
            <h2 className='text-4xl md:text-5xl font-bold text-black mb-6'>About Us</h2>
            
            
            <p className='text-gray-700 text-lg md:text-xl leading-relaxed'>
                Enjoy fast, reliable decoration services with real-time coordination and zero hassle. 
                From home decoration to wedding and ceremony planning — we deliver on time, every time.
            </p>

            <div className='flex flex-wrap text-2xl gap-8 mt-10 font-bold text-green-500'>
                <span className='cursor-pointer hover:text-blue-600 transition'>Story</span>
                <span className='cursor-pointer hover:text-blue-600 transition'>Mission</span>
                <span className='cursor-pointer hover:text-blue-600 transition'>Success</span>
                <span className='cursor-pointer hover:text-blue-600 transition'>Team & Others</span>
            </div>

            
            <div className='mt-8 space-y-6 text-gray-700 text-lg leading-relaxed'>
                <p>
                    We started with a simple promise — to make decoration services fast, reliable, and stress-free. 
                    Over the years, our commitment to planning, coordination, and customer-first service has made us a trusted partner for thousands. 
                    Whether it's a home makeover, wedding, or corporate event, we ensure it reaches perfection — on time, every time.
                </p>

                <p>
                    Our expert team works closely with clients to understand their vision and bring it to life. 
                    Every project is customized based on style, budget, and requirements, ensuring a unique and memorable experience.
                </p>

                <p>
                    With SmartHome Decor, you don’t just book a service — you get a full-fledged experience from planning to execution.
                </p>
            </div>
        </div>
    );
};

export default About;
