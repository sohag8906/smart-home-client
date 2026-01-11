import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner5 from '../../../assets/banner5.jpg';
import banner6 from '../../../assets/banner6.jpg';
import banner7 from '../../../assets/banner7.jpg';
import banner8 from '../../../assets/banner8.jpg';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router';

const Banner = () => {
    const banners = [
        {
            id: 1,
            image: banner8,
            title: "Transform Your Living Spaces",
            subtitle: "Premium Home Decoration Services",
            description: "Create the perfect ambiance with our expert interior design solutions.",
            buttonText: "Explore Services",
            buttonLink: "/services",
            color: "from-green-600/90 to-emerald-700/90",
            textColor: "text-white dark:text-gray-100"
        },
        {
            id: 2,
            image: banner7,
            title: "Dream Wedding Decorations",
            subtitle: "Make Your Special Day Unforgettable",
            description: "Complete wedding decoration packages with floral arrangements and lighting.",
            buttonText: "Book Now",
            buttonLink: "/wedding-services",
            color: "from-pink-600/90 to-rose-700/90",
            textColor: "text-white dark:text-gray-100"
        },
        {
            id: 3,
            image: banner6,
            title: "Office & Corporate Events",
            subtitle: "Professional Workspace Solutions",
            description: "Enhance productivity with our modern office decoration services.",
            buttonText: "View Portfolio",
            buttonLink: "/portfolio",
            color: "from-blue-600/90 to-indigo-700/90",
            textColor: "text-white dark:text-gray-100"
        },
        {
            id: 4,
            image: banner5,
            title: "Party & Event Planning",
            subtitle: "Celebrate in Style",
            description: "Birthday parties, anniversaries, and special events decoration.",
            buttonText: "Get Quote",
            buttonLink: "/contact",
            color: "from-purple-600/90 to-violet-700/90",
            textColor: "text-white dark:text-gray-100"
        }
    ];

    const CustomArrowPrev = (onClickHandler, hasPrev, label) =>
        hasPrev && (
            <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/90 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse animate-infinite animate-duration-[2000ms] animate-ease-in-out"
            >
                <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-100" />
            </button>
        );

    const CustomArrowNext = (onClickHandler, hasNext, label) =>
        hasNext && (
            <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/90 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse animate-infinite animate-duration-[2000ms] animate-ease-in-out"
            >
                <ChevronRight className="w-6 h-6 text-gray-800 dark:text-gray-100" />
            </button>
        );

    const CustomIndicator = (onClickHandler, isSelected, index, label) => (
        <li className="inline-block mx-1" key={index}>
            <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className={`w-3 h-3 rounded-full transition-all duration-300 animate-bounce-slow ${
                    isSelected ? 'bg-green-500 scale-125 animate-pulse' : 'bg-white/70 dark:bg-gray-400 hover:bg-white dark:hover:bg-gray-300'
                }`}
            />
        </li>
    );

    return (
        <div className="relative bg-gray-50 dark:bg-gray-900">
            <Carousel
                autoPlay
                infiniteLoop
                interval={5000}
                showThumbs={false}
                showStatus={false}
                showArrows
                showIndicators
                stopOnHover
                swipeable
                emulateTouch
                dynamicHeight={false}
                renderArrowPrev={CustomArrowPrev}
                renderArrowNext={CustomArrowNext}
                renderIndicator={CustomIndicator}
                className="rounded-2xl overflow-hidden shadow-2xl"
                transitionTime={1000}
            >
                {banners.map((banner, index) => (
                    <div key={banner.id} className="relative">
                        <img 
                            className='w-full h-[550px] md:h-[650px] object-cover' 
                            src={banner.image} 
                            alt={banner.title} 
                        />
                        
                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} mix-blend-multiply`}></div>
                        
                        {/* Content Container */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="container mx-auto px-4 md:px-8 lg:px-16">
                                <div className="max-w-2xl">
                                    {/* Badge */}
                                    <div className="inline-flex items-center gap-2 bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-bounce-slow">
                                        <Star className="w-4 h-4 text-yellow-300 animate-spin animate-infinite animate-duration-[3000ms]" fill="currentColor" />
                                        <span className={`text-sm font-semibold ${banner.textColor} animate-pulse animate-infinite animate-duration-[3000ms]`}>Premium Service Provider</span>
                                    </div>
                                    
                                    {/* Title with Typewriter Effect */}
                                    <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight ${banner.textColor} animate-slide-up`}>
                                        {banner.title}
                                    </h1>
                                    
                                    {/* Subtitle */}
                                    <h2 className={`text-xl md:text-2xl font-semibold mb-4 ${banner.textColor} animate-fade-in animate-delay-[300ms]`}>
                                        {banner.subtitle}
                                    </h2>
                                    
                                    {/* Description */}
                                    <p className={`text-lg md:text-xl mb-8 opacity-90 max-w-xl ${banner.textColor} animate-fade-in animate-delay-[500ms]`}>
                                        {banner.description}
                                    </p>
                                    
                                    {/* CTA Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animate-delay-[700ms]">
                                        <a
                                            href={banner.buttonLink}
                                            className="group inline-flex items-center justify-center bg-white text-gray-900 dark:bg-gray-100 dark:text-gray-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse animate-infinite animate-duration-[4000ms]"
                                        >
                                            <Link to='service'> {banner.buttonText}</Link>
                                           
                                            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform animate-pulse animate-infinite animate-duration-[1500ms]" />
                                        </a>
                                        
                                        <a
                                            href="/contact"
                                            className="inline-flex items-center justify-center bg-transparent border-2 border-white dark:border-gray-100 text-white dark:text-gray-100 font-bold px-8 py-4 rounded-xl hover:bg-white/10 dark:hover:bg-gray-700 transition-all duration-300 animate-pulse animate-infinite animate-duration-[3000ms]"
                                        >
                                            Free Consultation
                                        </a>
                                    </div>
                                    
                                    {/* Stats with Counter Animation */}
                                    <div className="flex flex-wrap gap-6 mt-12 animate-fade-in animate-delay-[900ms]">
                                        <div className={`${banner.textColor} animate-bounce-slow`}>
                                            <div className="text-2xl font-bold animate-count-up">5000+</div>
                                            <div className="text-sm opacity-80">Happy Clients</div>
                                        </div>
                                        <div className={`${banner.textColor} animate-bounce-slow animate-delay-[200ms]`}>
                                            <div className="text-2xl font-bold animate-count-up">24/7</div>
                                            <div className="text-sm opacity-80">Support</div>
                                        </div>
                                        <div className={`${banner.textColor} animate-bounce-slow animate-delay-[400ms]`}>
                                            <div className="text-2xl font-bold animate-count-up">100%</div>
                                            <div className="text-sm opacity-80">Satisfaction</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
            
            {/* Floating Elements */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-10">
                <div className="hidden md:flex items-center gap-2 bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm px-4 py-2 rounded-full animate-pulse animate-infinite animate-duration-[3000ms]">
                    <span className="text-white dark:text-gray-100 text-sm">Swipe to explore</span>
                    <ChevronRight className="w-4 h-4 text-white dark:text-gray-100 animate-bounce-x animate-infinite animate-duration-[1500ms]" />
                </div>
            </div>
            
            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent pointer-events-none"></div>

            {/* Custom CSS for Animations */}
            <style jsx>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                @keyframes countUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes bounceX {
                    0%, 100% {
                        transform: translateX(0);
                    }
                    50% {
                        transform: translateX(5px);
                    }
                }
                
                @keyframes bounceSlow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }
                
                @keyframes spinSlow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                
                .animate-slide-up {
                    animation: slideUp 0.8s ease-out forwards;
                }
                
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                    opacity: 0;
                }
                
                .animate-count-up {
                    animation: countUp 1s ease-out forwards;
                    opacity: 0;
                }
                
                .animate-bounce-x {
                    animation: bounceX 1.5s ease-in-out infinite;
                }
                
                .animate-bounce-slow {
                    animation: bounceSlow 2s ease-in-out infinite;
                }
                
                .animate-spin-slow {
                    animation: spinSlow 3s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default Banner;