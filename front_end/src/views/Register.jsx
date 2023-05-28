import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axiosClient from '../axios';
import { useStateContext } from '../contexts/ContextProvider';

const Register = () => {

  const {currentUser,userToken,setCurrentUser,setUserToken} = useStateContext();

  const router=useNavigate();

  const [formData, setFormData] = useState({
    role_id: 1,
    fullName: '',
    coffeeBrandName: '',
    subscription_id:'0',
    username: '',
    licenseNumber: '',
    address: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => {
      if (name === 'role_id') {
        return {
          ...prevFormData,
          role_id: value,
          fullName: value === 'customer' ? prevFormData.fullName : '',
          coffeeBrandName: value === 'coffeebrand' ? prevFormData.coffeeBrandName : ''
        };
      }
      return {
        ...prevFormData,
        [name]: value
      };
    });
  };
  
  


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

     // Send the data to the backend using Axios
     axiosClient.post('/register', formData)
       .then(response => {
         // Handle the response from the backend
         setCurrentUser(response.data.user)
         setUserToken(response.data.token)
         router('/dashboard')

       })
       .catch(error => {
         // Handle errors
         console.error(error);
       });
  };



  return (
    <>
      <h2 className="mb-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign Up for Free
      </h2>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm rounded-lg shadow-lg pb-10  pt-0">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex gap-4 justify-around bg-[#B66515] p-5">
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-500"
                name="role_id"
                value={2}
                checked={formData.role_id === 2}
                onChange={handleInputChange}

              />
              <span className="ml-2">Coffee Brand</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio text-green-500"
                name="role_id"
                value={1}
                checked={formData.role_id === 1}
                onChange={handleInputChange}
              />
              <span className="ml-2">Customer</span>
            </label>
          </div>

          <div className="p-10 pt-0">
            {formData.role_id === 1 ? (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
                  Full Name
                </label>
                <div className="mt-2">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="fullName"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="coffeeBrandName" className="block text-sm font-medium leading-6 text-gray-900">
                  Coffee Brand Name
                </label>
                <div className="mt-2">
                <input
                  id="coffeeBrandName"
                  name="coffeeBrandName"
                  type="text"
                  autoComplete="coffeeBrandName"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.coffeeBrandName}
                  onChange={handleInputChange}
                />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username 
              </label>
              <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.username}
                onChange={handleInputChange}
              />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.password}
                onChange={handleInputChange}
              />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Have Account?{' '}
          <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign in Here
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
