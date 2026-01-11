import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner5 from '../../../assets/banner5.jpg';
import banner6 from '../../../assets/banner6.jpg';
import banner7 from '../../../assets/banner7.jpg';
import banner8 from '../../../assets/banner8.jpg';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

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
            textColor: "text-white"
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
            textColor: "text-white"
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
            textColor: "text-white"
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
            textColor: "text-white"
        }
    ];

    const CustomArrowPrev = (onClickHandler, hasPrev, label) =>
        hasPrev && (
            <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
        );

    const CustomArrowNext = (onClickHandler, hasNext, label) =>
        hasNext && (
            <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
                <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
        );

    const CustomIndicator = (onClickHandler, isSelected, index, label) => (
        <li className="inline-block mx-1" key={index}>
            <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isSelected ? 'bg-green-500 scale-125' : 'bg-white/70 hover:bg-white'
                }`}
            />
        </li>
    );

    return (
        <div className="relative">
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                interval={5000}
                showThumbs={false}
                showStatus={false}
                showArrows={true}
                showIndicators={true}
                stopOnHover={true}
                swipeable={true}
                emulateTouch={true}
                dynamicHeight={false}
                renderArrowPrev={CustomArrowPrev}
                renderArrowNext={CustomArrowNext}
                renderIndicator={CustomIndicator}
                className="rounded-2xl overflow-hidden shadow-2xl"
            >
                {banners.map((banner) => (
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
                                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                                        <Star className="w-4 h-4 text-yellow-300" fill="currentColor" />
                                        <span className="text-sm font-semibold text-white">Premium Service Provider</span>
                                    </div>
                                    
                                    {/* Title */}
                                    <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${banner.textColor} mb-4 leading-tight`}>
                                        {banner.title}
                                    </h1>
                                    
                                    {/* Subtitle */}
                                    <h2 className={`text-xl md:text-2xl font-semibold ${banner.textColor} mb-4`}>
                                        {banner.subtitle}
                                    </h2>
                                    
                                    {/* Description */}
                                    <p className={`text-lg md:text-xl ${banner.textColor} mb-8 opacity-90 max-w-xl`}>
                                        {banner.description}
                                    </p>
                                    
                                    {/* CTA Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <a
                                            href={banner.buttonLink}
                                            className="inline-flex items-center justify-center bg-white text-gray-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                        >
                                            {banner.buttonText}
                                            <ChevronRight className="ml-2 w-5 h-5" />
                                        </a>
                                        
                                        <a
                                            href="/contact"
                                            className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                                        >
                                            Free Consultation
                                        </a>
                                    </div>
                                    
                                    {/* Stats */}
                                    <div className="flex flex-wrap gap-6 mt-12">
                                        <div className={`${banner.textColor}`}>
                                            <div className="text-2xl font-bold">5000+</div>
                                            <div className="text-sm opacity-80">Happy Clients</div>
                                        </div>
                                        <div className={`${banner.textColor}`}>
                                            <div className="text-2xl font-bold">24/7</div>
                                            <div className="text-sm opacity-80">Support</div>
                                        </div>
                                        <div className={`${banner.textColor}`}>
                                            <div className="text-2xl font-bold">100%</div>
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
                <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white text-sm">Swipe to explore</span>
                    <ChevronRight className="w-4 h-4 text-white animate-pulse" />
                </div>
            </div>
            
            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
        </div>
    );
};

export default Banner;