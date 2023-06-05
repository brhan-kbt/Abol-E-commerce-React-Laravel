import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import axiosClient from '../axios';
import { useStateContext } from '../contexts/ContextProvider';

const Contact = () => {
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const {currentUser}=useStateContext();
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: '',
        user_id:currentUser.id
      });
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        console.log("CurrentUser",currentUser.id);
    
        axiosClient
          .post('/contacts', formData)
          .then((response) => {
            console.log('Data sent successfully:', response.data);
            setSuccessMessage('Sent successfully,We\'ll Contact you Soon!')
            setFormData({ fullName: '', email: '', message: '' });
            setErrors({});
            setErrorMessage('');
          })
          .catch((error) => {
            if (error.response) {
              if (error.response.status === 404) {
                setErrorMessage('Login as Coffee Brand Owner to send a message.');
                console.log(error.response.status);
              } else if (error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
                console.log(error.response.data.errors);
              }
            }
            console.error('Error sending data:', error);
          });
      };

  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font relative">
        <div className="absolute inset-0 bg-gray-300">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="map"
            scrolling="no"
            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
          ></iframe>
        </div>
        <div className="container px-5 py-8 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Contact Us</h2>
            <p className="leading-relaxed mb-5 text-gray-600">
              Please feel free to reach out to us for any inquiries. We are here to help.
            </p>
            {successMessage && <p className="text-green-500 text-xs mt-3 font-bold">{successMessage}</p>}

            <div className="relative mb-4">
              <label htmlFor="fullName" className="leading-7 text-sm text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
               {errors.fullName && (
                <p className="text-red-500 text-xs mt-1 font-bold">{errors.fullName}</p>
              )}
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
               {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-bold">{errors.email}</p>
              )}
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="leading-7 text-sm text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
               {errors.message && (
                <p className="text-red-500 text-xs mt-1 font-bold">{errors.message}</p>
              )}
            {errorMessage && <p className="text-red-500 text-xs mt-3 font-bold">{errorMessage}</p>}
            </div>

            <button
              type="submit"
              className="text-white bg-[#B86919] border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded text-lg"
              onClick={handleSubmit}
            >
              Send
            </button>
            <p className="text-xs text-gray-500 mt-3"></p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
