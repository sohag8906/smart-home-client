import React from 'react';
import Banner from '../banner/Banner';
import HeroSection from '../HeroSection/HeroSection';
import Reviews from '../Reviews';

import TopServices from '../TopServices';

const reviewsPromise = fetch('/reviews.json').then(res => res.json());
const Home = () => {
    return (
        <div className='mt-2 bg-pink-100 '>
          <Banner></Banner> 
          <TopServices></TopServices>
          <HeroSection></HeroSection>
          
          <Reviews reviewsPromise={reviewsPromise}></Reviews>
          
        </div>
    );
};

export default Home;