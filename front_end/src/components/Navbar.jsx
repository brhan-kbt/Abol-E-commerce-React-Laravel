import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/tlogo1.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleBar = () => {
    setIsOpen(!isOpen);
    console.log('clicked');
  };

  return (
    <>
      <section className="bg-gray-900">
        <nav className="relative px-4 mx-4 md:mx-8  flex justify-between items-center" style={{zIndex:100000}}>
          <Link className="text-3xl font-bold leading-none" to="/">
            <img className="h-20" src={logo} alt="" />
          </Link>
          <div className="lg:hidden">
            <button className="navbar-burger flex items-center text-blue-600 p-3" onClick={handleBar}>
              {!isOpen && (
                <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Mobile menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
              )}
              {isOpen && (
                <svg
                  className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              )}
            </button>
          </div>
           <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
            <li>
                <Link
                className={`block p-4 text-medium font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded ${
                    isActive ? 'bg-blue-50 text-blue-600' : ''
                }`}
                to="/"
                >
                Home
                </Link>
            </li>
            <li>
                <Link
                className={`block p-4 text-medium font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded ${
                    isActive ? 'bg-blue-50 text-blue-600' : ''
                }`}
                to="/shop"
                >
                Shop
                </Link>
            </li>
            <li>
                <Link
                className={`block p-4 text-medium font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded ${
                    isActive ? 'bg-blue-50 text-blue-600' : ''
                }`}
                to="/about"
                >
               About Us
                </Link>
            </li>
            <li>
                <Link
                className={`block p-4 text-medium font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded ${
                    isActive ? 'bg-blue-50 text-blue-600' : ''
                }`}
                to="/contact"
                >
                Contact Us
                </Link>
            </li>
            </ul>
          <Link
            className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-[#B86919] hover:bg-gray-500 text-sm text-gray-100 font-bold
            rounded-md transition duration-200"
            to="/login"
          >
            Sign In
          </Link>
          <Link className="hidden lg:inline-block py-2 px-6 bg-[#B86919] hover:bg-gray-500 text-sm text-gray-100 font-bold rounded-md transition duration-200" to="/register">
            Sign up
          </Link>
        </nav>
        {isOpen && (
            <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-black z-100000 border-r overflow-y-auto" style={{zIndex:200000}}>
            <div className="flex items-center mb-8">
                <a className="mr-auto text-3xl font-bold leading-none" href="#">
                <img className="h-20" src={logo} alt="" />
                </a>
                <button className="navbar-close" onClick={handleBar}>
                <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                </button>
            </div>
            <div>
                <ul>
                    <li className="mb-1">
                    <Link
                        className={`block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded ${
                        isActive ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      to="/"
                    >
                        Home
                    </Link>
                    </li>
                    <li className="mb-1">
                    <Link
                        className={`block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded ${
                        isActive ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      to="/shop"
                    >
                        Shop
                    </Link>
                    </li>
                    <li className="mb-1">
                    <Link
                        className={`block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded ${
                        isActive ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      to="/about"
                    >
                       About Us
                    </Link>
                    </li>
                   
                    <li className="mb-1">
                    <Link
                        className={`block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded ${
                        isActive ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      to="/contact"
                    >
                        Contact Us
                    </Link>
                    </li>
                </ul>
            </div>
            <div className="mt-auto">
                <div className="pt-6">
                <Link className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl" 
                to="/login">
                    Sign in
                </Link>
                <Link className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl"
                 to="/register">
                    Sign Up
                </Link>
                </div>
                <p className="my-4 text-xs text-center text-gray-400">
                <span>Copyright © 2023</span>
                </p>
            </div>
            </nav>
        )}
      </section>
    </>
  );
};

export default Navbar;
