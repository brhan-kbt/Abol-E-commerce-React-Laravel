import { Add, Dashboard, Logout, LogoutOutlined, Person, Settings, ShoppingCart } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/tlogo1.png';
import { useStateContext } from '../contexts/ContextProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(false);

  const handleToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

 
  const { currentUser, cartItems } = useStateContext(); // Get currentUser and cartItems from context
  // const cartTotal = cartItems.reduce((total, item) => total + item.quantity, 0); 
  // Calculate the total quantity of items in the cart
  const cartTotal = cartItems.length; // Calculate the total quantity of items in the cart
 
 console.log(cartTotal);
  useEffect(() => {
    if (Object.keys(currentUser).length !== 0) {
      setUser(true);
    } else {
      setUser(false);
      console.log('False');
    }
  }, [currentUser]);

  console.log('User:',user);
  
  const navigate=useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('abol_user');
    localStorage.removeItem('abol_token');
    navigate('/login');
    window.location.reload(); // Force page reload
  };



  return (
    <>
      <section className="bg-gray-900">
        <nav className="relative px-4 mx-4 md:mx-8  flex justify-between items-center" style={{zIndex:100000}}>
          <Link className="text-3xl font-bold leading-none" to="/">
            <img className="h-20" src={logo} alt="" />
          </Link>
          <div className="lg:hidden">
            <button className="navbar-burger flex items-center text-blue-600 p-3" onClick={handleMenuToggle}>
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

            {  currentUser && currentUser.role && currentUser.role.name == 'customer'  &&
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
            }

      {  !user  &&
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
            }

            { currentUser && currentUser.role && currentUser.role.name === 'coffeebrand' &&
            <>
            <li>
            <Link
                className={`block p-4 text-medium font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded ${
                isActive ? 'bg-blue-50 text-blue-600' : ''
            }`}
              to="/coffee-brand/post"
            >
                My Products
            </Link>
            </li>
            <li>
            <Link
                className={`block p-4 text-medium font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded ${
                  isActive ? 'bg-blue-50 text-blue-600' : ''
              }`}
              to="/coffee-brand/advert"
            >
                My Adverts
            </Link>
            </li>
            </>
            }
            <li>
                <Link
                className={`block p-1 text-medium font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded ${
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
            
            {user ? (
              <>

              <div className='flex justify-center gap-8 items-center'>

             {  currentUser && currentUser.role && currentUser.role.name != 'coffeebrand'  &&
            
             <Link to="/cart" className="relative">
                <ShoppingCart sx={{width:'40px'}} className="text-[#B5681B]  rounded-full" />
                {cartTotal > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-1   text-white text-xs font-semibold rounded-full">
                    {cartTotal}
                  </span>
                )}
              </Link>}
                 <div className="hidden lg:inline-block relative" data-te-dropdown-ref>

                <button
                  className="hidden-arrow flex gap-3 items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                  id="dropdownMenuButton2"
                  role="button"
                  data-te-dropdown-toggle-ref
                  aria-expanded={isOpen ? 'true' : 'false'}
                  onClick={handleToggle}
                >
                  <Person sx={{width:'40px',height:'40px'}} className='text-[#B5681B] border  border-[#B5681B] rounded-full'/>
                  <div>
                  <p className='text-white font-bold'>{currentUser.username}</p>
                  <small className='text-[#B5681B] flex items-start font-bold'>{currentUser.role.name}</small>
                  </div>
                </button>
                {isDropdownOpen && (
                  <ul
                    className="absolute left-auto right-0 z-[1000] float-left  m-0 mt-3 min-w-max list-none overflow-hidden rounded-lg border-none bg-[#111827] bg-clip-padding text-left text-base shadow-lg "
                    aria-labelledby="dropdownMenuButton2"
                    data-te-dropdown-menu-ref
                  >
                    {currentUser && currentUser.role && currentUser.role.name === 'coffeebrand' && (
                      <>
                      <li>
                        <Link
                          className="block w-full  whitespace-nowrap bg-transparent px-10 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                          to="/coffee-brand/dashboard"
                          data-te-dropdown-item-ref
                        >
                          <Dashboard />
                          My Dashboard
                        </Link>
                      </li>
                      <li></li>
                        {/* <li>
                          <Link
                            className="block w-full whitespace-nowrap bg-transparent px-10 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                            to="/coffee-brand/post"
                            data-te-dropdown-item-ref
                          >
                            <Add />
                            My Products
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="block w-full whitespace-nowrap bg-transparent px-10 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                            to="/coffee-brand/advert"
                            data-te-dropdown-item-ref
                          >
                            <Add />
                            My Adverts
                          </Link>
                        </li> */}

                        {/* <li>
                          <Link
                            className="block w-full  whitespace-nowrap bg-transparent px-10 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                            to="/profile"
                            data-te-dropdown-item-ref
                          >
                            <Settings />
                            Setting
                          </Link>
                        </li> */}
                      </>
                    )}

                    {currentUser && currentUser.role && currentUser.role.name === 'customer' && (
                      <>
                      <li>
                        <Link
                          className="block w-full  whitespace-nowrap bg-transparent px-10 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                          to="/customer/dashboard"
                          data-te-dropdown-item-ref
                        >
                          <Dashboard />
                          My Dashboard
                        </Link>
                      </li>
                      
                    </>
                    )}

    
                    <li>
                      <a
                        className="block w-full whitespace-nowrap bg-transparent px-11 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                        data-te-dropdown-item-ref
                        onClick={handleLogout}
                      >
                        <Logout/>
                        Logout
                      </a>
                    </li>
                  </ul>
                )}
                </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-[#B86919] hover:bg-gray-500 text-sm text-gray-100 font-bold rounded-md transition duration-200"
                  to="/login"
                >
                  Sign In
                </Link>
                <Link
                  className="hidden lg:inline-block py-2 px-6 bg-[#B86919] hover:bg-gray-500 text-sm text-gray-100 font-bold rounded-md transition duration-200"
                  to="/register"
                >
                  Sign Up
                </Link>
                <Link to="/cart" className="relative">
                <ShoppingCart sx={{width:'40px'}} className="text-[#B5681B]  rounded-full" />
                {cartTotal > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-1   text-white text-xs font-semibold rounded-full">
                    {cartTotal}
                  </span>
                )}
              </Link>
              </>
            )}
  
    
        </nav>
        {isOpen && (
            <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-black z-100000 border-r overflow-y-auto" style={{zIndex:200000}}>
            
            
            <div className="flex items-center mb-8">
                <Link className="mr-auto text-3xl font-bold leading-none" to="/">
                  <img className="h-20" src={logo} alt="" />
                </Link>
                <button className="navbar-close" onClick={handleMenuToggle}>
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
                  { currentUser && currentUser.role && currentUser.role.name === 'coffeebrand' &&
                    <>
                    <Link
                        className={`block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded ${
                        isActive ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      to="/coffee-brand/post"
                    >
                        My Products
                    </Link>
                    <Link
                        className={`block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded ${
                        isActive ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      to="/coffee-brand/advert"
                    >
                        My Adverts
                    </Link>
                    </>
                    }
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
                    {currentUser && currentUser.role && currentUser.role.name === 'coffeebrand' && (
                      <>
                      <li>
                        <Link
                          className="block w-full  whitespace-nowrap bg-transparent pl-4  py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                          to="/coffee-brand/dashboard"
                          data-te-dropdown-item-ref
                        >
                          My Dashboard
                        </Link>
                      </li>
                      <li></li>
                        {/* <li>
                          <Link
                            className="block w-full whitespace-nowrap bg-transparent pl-4  py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                            to="/coffee-brand/post"
                            data-te-dropdown-item-ref
                          >
                            My Products
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="block w-full whitespace-nowrap bg-transparent      pl-4  py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                            to="/coffee-brand/advert"
                            data-te-dropdown-item-ref
                          >
                            My Adverts
                          </Link>
                        </li> */}

                       
                      </>
                    )}

                    {currentUser && currentUser.role && currentUser.role.name === 'customer' && (
                      <>
                      <li>
                        <Link
                          className="block w-full  whitespace-nowrap bg-transparent  pl-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                          to="/customer/dashboard"
                          data-te-dropdown-item-ref
                        >
                          My Dashboard
                        </Link>
                      </li>
                      <li>
                      
                    </li>
                    </>
                    )}

    
                    <li>
                      <a
                        className="block w-full pl-4 whitespace-nowrap bg-transparent  py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                        data-te-dropdown-item-ref
                        onClick={handleLogout}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
            </div>

            {!currentUser && !currentUser.role && !currentUser.role.name&&
              
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
            </div>}
            </nav>
        )}
      </section>
    </>
  );
};

export default Navbar;
