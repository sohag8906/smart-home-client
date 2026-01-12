import React from 'react';
import Banner from '../banner/Banner';
import HeroSection from '../HeroSection/HeroSection';
import Reviews from '../Reviews';
import TopServices from '../TopServices';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';


const reviewsPromise = fetch('/reviews.json').then(res => res.json());

const Home = () => {
    return (
        // Page wrapper: background controlled by dark mode
        <div className="mt-2 transition-colors duration-300 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">

          {/* Banner */}
          <Banner className="dark:bg-gray-900 dark:text-gray-100" />

          {/* Top Services */}
          <TopServices className="dark:bg-gray-900 dark:text-gray-100" />

          {/* Hero Section */}
          <HeroSection className="dark:bg-gray-900 dark:text-gray-100" />

          {/* Reviews */}
          <Reviews reviewsPromise={reviewsPromise} className="dark:bg-gray-900 dark:text-gray-100" />

          <WhyChooseUs className="dark:bg-gray-900 dark:text-gray-100"></WhyChooseUs>

        </div>
    );
};

export default Home;
