import React from 'react';
import AppBanner from '../components/shared/AppBanner';
import Booking from './Booking';
import Testimonials from '../pages/Testimonials';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto ">
	  <AppBanner />
    <Booking />
	  <Testimonials/>
	  
    </div>
  );
};

export default Home;
