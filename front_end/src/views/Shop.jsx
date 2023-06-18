import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import React, { useEffect, useState,Fragment } from 'react';

import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import axiosClient from '../axios'
import { CompareArrowsRounded } from '@mui/icons-material';
import ReactPaginate from 'react-paginate';
import photo from '../assets/buna3.jpg'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import loading from '../assets/loading.gif'
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import { Rating } from '@mui/material';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const Shop = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [banner, setBanner] = useState('');
  const {currentUser,addToCart}=useStateContext();
  const [subscriptions, setSubscriptions] = useState([]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    axiosClient.get('/products')
        .then(response => {
            const productsData = response.data;
            console.log('Products', productsData);
            // Filter products with status 1
            const filteredProducts = productsData.filter(product => product.product.status === 1);
            setUsers(filteredProducts);
            setIsLoading(false);
        })
        .catch(error => {
            console.error(error);
            setIsLoading(false);

        });

}, []);


      const productsPerPage = 12;
      const pageCount = Math.ceil(users.length / productsPerPage);
      const offset = currentPage * productsPerPage;
      const currentProducts = users.slice(offset, offset + productsPerPage);
    
      const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
      };

      const navigate = useNavigate();
      const setSelectedProduct = (prod) => {
        navigate(`/shop/${prod.product.id}`, { state: prod });
      };
 
      
      const handleAddToCart=(prod)=>{
        
        console.log('clicked',prod.product);
        const productWithQuantity = { ...prod.product, quantity: 1 };
        console.log(productWithQuantity);
        addToCart(productWithQuantity);
      }

      const [selectedProducts, setSelectedProducts] = useState([]);

      const handleCompare = () => {
        // Filter the products by average rating
        const filteredProducts = users.filter((product) => product.average_rating >= 0);
      
        // Sort the filtered products by average rating in descending order
        const sortedProducts = filteredProducts.sort((a, b) => {
          if (a.average_rating === b.average_rating) {
            // If average rating is the same, sort by order count in descending order
            return b.order_items_count - a.order_items_count;
          }
          // Sort by average rating in descending order
          return b.average_rating - a.average_rating;
        });
      
        // Set the sorted products as the current products for rendering
        setUsers(sortedProducts);
      
        // Reset the current page to the first page
        setCurrentPage(0);
      };
      
      const handleSortByPopular = () => {
        console.log('handleSortByPopular');
      
        const filteredProducts = users.filter((product) => product.average_rating >= 0);
      
        const sortedProducts = filteredProducts.sort((a, b) => b.order_items_count - a.order_items_count);
        setUsers(sortedProducts);
      };
      
      const handleSortByRating = () => {
        console.log('handleSortByRating');
      
        const filteredProducts = users.filter((product) => product.average_rating >= 0);
      
        const sortedProducts = filteredProducts.sort((a, b) => b.average_rating - a.average_rating);
        setUsers(sortedProducts);
      };
      
      const handleSortByNewest = () => {
        console.log('handleSortByNewest');
      
        const filteredProducts = users.filter((product) => product.average_rating >= 0);
      
        const sortedProducts = filteredProducts.sort((a, b) => new Date(b.product.updated_at) - new Date(a.product.updated_at));
        setUsers(sortedProducts);
      };
      
      const handleSortByPriceLow = () => {
        console.log('handleSortByPriceLow');
      
        const filteredProducts = users.filter((product) => product.average_rating >= 0);
      
        const sortedProducts = filteredProducts.sort((a, b) => a.product.price - b.product.price);
        setUsers(sortedProducts);
      };
      
      const handleSortByPriceHigh = () => {
        console.log('handleSortByPriceHigh');
      
        const filteredProducts = users.filter((product) => product.average_rating >= 0);
      
        const sortedProducts = filteredProducts.sort((a, b) => b.product.price - a.product.price);
        setUsers(sortedProducts);
      };
      
      
      const sortOptions = [
        { name: 'Most Popular', href: '#', current: true, onClick: handleSortByPopular },
        { name: 'Best Rating', href: '#', current: false, onClick: handleSortByRating },
        { name: 'Newest', href: '#', current: false, onClick: handleSortByNewest },
        { name: 'Price: Low to High', href: '#', current: false, onClick: handleSortByPriceLow },
        { name: 'Price: High to Low', href: '#', current: false, onClick: handleSortByPriceHigh },
      ];
      
      
      const filters = [
        {
          id: 'coffeebrand',
          name: 'Coffee Brand',
          options: [
            { value: 'harar', label: 'Harar', checked: false },
            { value: 'yirga', label: 'Yirga Chaffee', checked: false },
            { value: 'keffa', label: 'Kafa', checked: false },
            { value: 'wolega', label: 'Wolega', checked: false },
          ],
        },
        {
          id: 'coffeeweight',
          name: 'Weight in Kilogram',
          options: [
            { value: '0.5', label: '0.5 KG', checked: false },
            { value: '1', label: '1 KG', checked: false },
            { value: '1.5', label: '1.5 KG', checked: false },
            { value: '2', label: '2 G', checked: false },
          ],
        },
        {
          id: 'type',
          name: 'Type',
          options: [
            { value: 'unroasted', label: 'Unroasted', checked: false },
            { value: 'roasted', label: 'Roasted', checked: false },
            { value: 'whole', label: 'Whole', checked: false },
            { value: 'powdered', label: 'Powdered', checked: false },
          ],
        },
      ]
      
      
    const [currentImages, setCurrentImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axiosClient
      .get('/adverts')
      .then((response) => {
        const productsData = response.data;
        console.log('Adverts', productsData);
        // Filter products with status 1
        const filteredProducts = productsData.filter((product) => product.status === 1);
        setSubscriptions(filteredProducts);
        const imageUrls = filteredProducts.map((product) => product.photo);
        setCurrentImages(imageUrls);
        console.log(imageUrls);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % currentImages.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentImages]);
 
  
  const items = subscriptions.map(advert => (
    <div key={advert.id}>
      <h2>{advert.name}</h2>
      <p>{advert.description}</p>
      <img src={advert.photo} alt="" srcset="" />

    </div>
  ));

  const getThreeImages = () => {
    const firstIndex = currentIndex;
    const secondIndex = (currentIndex + 1) % currentImages.length;
    const thirdIndex = (currentIndex + 2) % currentImages.length;
    return [currentImages[firstIndex], currentImages[secondIndex], currentImages[thirdIndex]];
  };
  const carouselOptions = {
    items: items,
    autoPlay: true,
    autoPlayInterval: 3000,
    infinite: true,
    disableButtonsControls: true,
    // disableDotsControls: true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 3 },
    },
    stagePadding: {
      paddingLeft: 0, // Adjust the left padding
      paddingRight: 0, // Adjust the right padding
    },
  };
  
      
  return (
    <>
    <Navbar/>
   <div className='bg-[#B76615]'>
   <AliceCarousel {...carouselOptions}>
      {items.map((item, index) => (
        <div key={index} className="carousel-item">
          <div className="carousel-content">
            <h2>{item.props.children[0]}</h2>
            <p>{item.props.children[1]}</p>
            <img
              src={item.props.children[2].props.src}
              alt=""
              srcSet=""
              style={{ maxHeight: '200px' }} // Set the maximum height for the image
            />
          </div>
        </div>
      ))}
    </AliceCarousel>
   </div>
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Coffee Shop</h1>

            <div className="flex items-start px-24">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                              onClick={option.onClick}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button onClick={handleCompare} type="button" title='Compare' className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <CompareArrowsRounded className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          {/* <button onClick={handleCompare}>Compare</button> */}

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

        <div className='grid grid-cols-4 gap-x-8 p-10'>
            <div className="col-span-4 md:col-span-3 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <section class="col-span-5 py-3 bg-gray-100">
                  {isLoading &&
                  <div className='flex align-items-center justify-center'>
                   <img src={loading} alt="" srcset="" />

                  </div>
                  // <h2>Loadig....</h2>
                  }
                   {!isLoading &&
                    <div className='grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-4 grid lg:grid-cols-4'>
                    {users.map((product) => (
                    <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 " >
                    <a>
                        <div className="relative flex items-end overflow-hidden rounded-xl">
                          <a href="" onClick={() => setSelectedProduct(product)}>
                          <img src={product.product.photo} alt="coffee Photo" />
                          </a>
                        </div>

                        <div className="mt-1 p-2">
                        <a href="" onClick={() => setSelectedProduct(product)}>
                        <h2 className="text-slate-700">{product.product.productName}</h2>
                        </a>
                        <p className="mt-1 text-sm text-slate-400">{product.brand}</p>
                            <Rating value={product.average_rating}  readOnly/>

                        <div className="mt-3 flex items-end justify-between">
                            <p className="text-lg font-bold text-[#B86919]">{product.product.price}</p>

                            <div className="flex items-center space-x-1.5 rounded-lg bg-[#B86919] px-4 py-1.5 text-white duration-100 hover:bg-gray-700">

                            <button className="text-sm" onClick={()=>handleAddToCart(product)}>Add to </button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            </div>
                        </div>
                        </div>
                    </a>
                    </article>
                    ))}
                    </div>
                    }
                    
                    {!isLoading &&
                      
                      <div className="pagination">
                    {currentPage !== 0 && (
                      <button className="pagination__link" onClick={() => handlePageChange({ selected: currentPage - 1 })}>
                        Previous
                      </button>
                    )}

                    {Array.from({ length: pageCount }).map((_, index) => (
                      <button
                        key={index}
                        className={`pagination__link ${currentPage === index ? 'pagination__link--active' : ''}`}
                        onClick={() => handlePageChange({ selected: index })}
                      >
                        {index + 1}
                      </button>
                    ))}

                    {currentPage !== pageCount - 1 && (
                      <button className="pagination__link" onClick={() => handlePageChange({ selected: currentPage + 1 })}>
                        Next
                      </button>
                    )}
                    </div>}

                </section>
            </div>
            <div className='col-span-4  mt-3 md:col-span-1'>
            <div className='space-y-4   '>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                getThreeImages().map((imageUrl, index) => (
                    <img
                      src={imageUrl}
                      style={{ height: '200px' }}
                      alt={`Image ${index + 1}`}
                      className="w-full"
                      key={imageUrl}
                      onLoad={() => console.log(`Image ${index + 1} loaded successfully.`)}
                    />
                ))
              )}
            </div>
            </div>


          </div>
          </section>
        </main>
      </div>
    </div>


    <Footer/>
    </>
  )
}

export default Shop