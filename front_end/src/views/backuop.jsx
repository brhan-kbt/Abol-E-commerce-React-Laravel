import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import React, { useEffect, useState,Fragment } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import axiosClient from '../axios'
import ReactPaginate from 'react-paginate';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const Shop = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCoffeeBrand, setSelectedCoffeeBrand] = useState([]);
  const [selectedCoffeeWeight, setSelectedCoffeeWeight] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
  ];

  const filters = [
    {
      id: 'coffeebrand',
      name: 'Coffee Brand',
      options: [
        { value: 'harar', label: 'Harar', checked: selectedCoffeeBrand.includes('harar') },
        { value: 'yirga', label: 'Yirga Chaffee', checked: selectedCoffeeBrand.includes('yirga') },
        { value: 'keffa', label: 'Kafa', checked: selectedCoffeeBrand.includes('keffa') },
        { value: 'wolega', label: 'Wolega', checked: selectedCoffeeBrand.includes('wolega') },
      ],
    },
    {
      id: 'coffeeweight',
      name: 'Weight in Kilogram',
      options: [
        { value: '0.5', label: '0.5 KG', checked: selectedCoffeeWeight.includes('0.5') },
        { value: '1', label: '1 KG', checked: selectedCoffeeWeight.includes('1') },
        { value: '1.5', label: '1.5 KG', checked: selectedCoffeeWeight.includes('1.5') },
        { value: '2', label: '2 G', checked: selectedCoffeeWeight.includes('2') },
      ],
    },
    {
      id: 'type',
      name: 'Type',
      options: [
        { value: 'unroasted', label: 'Unroasted', checked: selectedType.includes('unroasted') },
        { value: 'roasted', label: 'Roasted', checked: selectedType.includes('roasted') },
        { value: 'whole', label: 'Whole', checked: selectedType.includes('whole') },
        { value: 'powdered', label: 'Powdered', checked: selectedType.includes('powdered') },
      ],
    },
  ];

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get('/products');
        setUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchData();
  }, []);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const handleCoffeeBrandChange = (value) => {
    const selectedBrands = selectedCoffeeBrand.includes(value)
      ? selectedCoffeeBrand.filter((brand) => brand !== value)
      : [...selectedCoffeeBrand, value];
    setSelectedCoffeeBrand(selectedBrands);
  };

  
  // Filter the products based on the selected filters
  const filteredProducts = users.filter((user) => {
    // Check if the coffee brand matches any selected brand
    if (selectedCoffeeBrand.length > 0 && !selectedCoffeeBrand.includes(user.coffeebrand)) {
      return false;
    }

    // Check if the coffee weight matches any selected weight
    if (selectedCoffeeWeight.length > 0 && !selectedCoffeeWeight.includes(user.coffeeweight)) {
      return false;
    }

    // Check if the coffee type matches any selected type
    if (selectedType.length > 0 && !selectedType.includes(user.type)) {
      return false;
    }

    return true;
  });

  // Pagination
  const perPage = 9;
  const pageCount = Math.ceil(filteredProducts.length / perPage);
  const offset = currentPage * perPage;
  const paginatedProducts = filteredProducts.slice(offset, offset + perPage); 

 
  return (
    <>
    <Navbar/>
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200 col-span-1">

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Coffee Shop</h1>

            <div className="flex items-center">
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
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
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

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
              {filters.map((filter) => (
                    <Disclosure as={Fragment} key={filter.id}>
                      {({ open }) => (
                        <>
                          <h3 className="font-medium tracking-wide text-gray-900">{filter.name}</h3>
                          <div className="mt-2 space-y-2">
                            {filter.options.map((option) => (
                              <div
                                key={option.value}
                                className="flex items-center justify-between"
                              >
                                <label
                                  htmlFor={`${filter.id}-${option.value}`}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`${filter.id}-${option.value}`}
                                    name={filter.id}
                                    value={option.value}
                                    type="checkbox"
                                    checked={option.checked}
                                    onChange={() => {
                                      if (filter.id === 'coffeebrand') {
                                        handleCoffeeBrandChange(option.value);
                                      } else if (filter.id === 'coffeeweight') {
                                        // handleCoffeeWeightChange(option.value);
                                      } else if (filter.id === 'type') {
                                        // handleTypeChange(option.value);
                                      }
                                    }}
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                  />
                                  <span className="ml-2 text-gray-900">{option.label}</span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </Disclosure>
                  ))}
              </form>

            
                <section class="col-span-3 py-3 bg-gray-100">
                    <div className='grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-4 grid lg:grid-cols-4'>
                    {filteredProducts.map((product) => (
                    <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                    <a href="#">
                        <div class="relative flex items-end overflow-hidden rounded-xl">
                        <img src={product.photo} alt="Hotel Photo" />
                        </div>

                        <div class="mt-1 p-2">
                        <h2 class="text-slate-700">{product.productName}</h2>
                        <p class="mt-1 text-sm text-slate-400">{product.brand}</p>

                        <div class="mt-3 flex items-end justify-between">
                            <p class="text-lg font-bold text-[#B86919]">$850</p>

                            <div class="flex items-center space-x-1.5 rounded-lg bg-[#B86919] px-4 py-1.5 text-white duration-100 hover:bg-gray-700">

                            <button class="text-sm">Add to </button>
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
                  </div>

                </section>


            
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