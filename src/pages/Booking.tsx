import React from 'react';
import { motion } from 'framer-motion';
import BookingForm from '../components/booking/BookingForm';

const Contact: React.FC = () => {
  const handleFormDataSubmit = (formData: any) => {
    // Handle the form data submission here
    console.log('Form Data submitted:', formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: 'easeInOut',
        duration: 0.5,
        delay: 0.1,
      }}
      className="container mx-auto flex flex-col-reverse lg:flex-row py-5 lg:py-10 lg:mt-10"
    >
      <BookingForm onFormDataSubmit={handleFormDataSubmit} />
      
    </motion.div>
  );
};

export default Contact;
