import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Checkout = () => {
  return (
    <>
    <Navbar/>
{/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

<section>
  {/* <h1 className="sr-only">Checkout</h1> */}

  <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
    <div className="bg-gray-100 my-12 py-5 mx-10">
        <h1 className='text-center mb-10 text-xl'>Order Summary</h1>
    <div class=" rounded-lg px-16">
        <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="product-image" class="w-full rounded-lg sm:w-40" />
          <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div class="mt-5 sm:mt-0">
              <h2 class="text-lg font-bold text-gray-900">Nike Air Max 2019</h2>
              <p class="mt-1 text-xs text-gray-700">36EU - 4US</p>
            </div>
            <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div class="flex items-center border-gray-100">
                <span class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                <input class="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="2" min="1" />
                <span class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
              </div>
              <div class="flex items-center space-x-4">
                <p class="text-sm">259.000 ₭</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80" alt="product-image" class="w-full rounded-lg sm:w-40" />
          <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div class="mt-5 sm:mt-0">
              <h2 class="text-lg font-bold text-gray-900">Nike Air Max 2019</h2>
              <p class="mt-1 text-xs text-gray-700">36EU - 4US</p>
            </div>
            <div class="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div class="flex items-center border-gray-100">
                <span class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                <input class="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="2" min="1" />
                <span class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
              </div>
              <div class="flex items-center space-x-4">
                <p class="text-sm">259.000 ₭</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 ">
        <div class="mb-2 flex justify-between">
          <p class="text-gray-700">Subtotal</p>
          <p class="text-gray-700">$129.99</p>
        </div>
        <div class="flex justify-between">
          <p class="text-gray-700">Shipping</p>
          <p class="text-gray-700">$4.99</p>
        </div>
        <hr class="my-4" />
        <div class="flex justify-between">
          <p class="text-lg font-bold">Total</p>
          <div class="">
            <p class="mb-1 text-lg font-bold">$134.98 USD</p>
            <p class="text-sm text-gray-700">including VAT</p>
          </div>
        </div>
        <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
      </div>
      </div>
    </div>

    <div className="bg-gray-50 my-12 py-5 mx-10">
    <h1 className='text-center mb-10 text-xl'>Contact Information</h1>

      <div className="mx-auto max-w-lg px-4 lg:px-8">
        <form className="grid grid-cols-6 gap-4">
          <div className="col-span-3">
            <label
              htmlFor="FirstName"
              className="block text-xs font-medium text-gray-700"
            >
              First Name
            </label>

            <input
              type="text"
              id="FirstName"
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            />
          </div>

          <div className="col-span-3">
            <label
              htmlFor="LastName"
              className="block text-xs font-medium text-gray-700"
            >
              Last Name
            </label>

            <input
              type="text"
              id="LastName"
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            />
          </div>

          <div className="col-span-6">
            <label htmlFor="Email" className="block text-xs font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              id="Email"
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            />
          </div>

          <div className="col-span-6">
            <label htmlFor="Phone" className="block text-xs font-medium text-gray-700">
              Phone
            </label>

            <input
              type="tel"
              id="Phone"
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            />
          </div>

          <fieldset className="col-span-6">
            <legend className="block text-sm font-medium text-gray-700">
              Card Details
            </legend>

            <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
              <div>
                <label htmlFor="CardNumber" className="sr-only"> Card Number </label>

                <input
                  type="text"
                  id="CardNumber"
                  placeholder="Card Number"
                  className="relative mt-1 w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                />
              </div>

              <div className="flex">
                <div className="flex-1">
                  <label htmlFor="CardExpiry" className="sr-only"> Card Expiry </label>

                  <input
                    type="text"
                    id="CardExpiry"
                    placeholder="Expiry Date"
                    className="relative w-full rounded-es-md border-gray-200 focus:z-10 sm:text-sm"
                  />
                </div>

                <div className="-ms-px flex-1">
                  <label htmlFor="CardCVC" className="sr-only"> Card CVC </label>

                  <input
                    type="text"
                    id="CardCVC"
                    placeholder="CVC"
                    className="relative w-full rounded-ee-md border-gray-200 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="col-span-6">
            <legend className="block text-sm font-medium text-gray-700">
              Billing Address
            </legend>

            <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
              <div>
                <label htmlFor="Country" className="sr-only">Country</label>

                <select
                  id="Country"
                  className="relative w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                >
                  <option>England</option>
                  <option>Wales</option>
                  <option>Scotland</option>
                  <option>France</option>
                  <option>Belgium</option>
                  <option>Japan</option>
                </select>
              </div>

              <div>
                <label className="sr-only" htmlFor="PostalCode"> ZIP/Post Code </label>

                <input
                  type="text"
                  id="PostalCode"
                  placeholder="ZIP/Post Code"
                  className="relative w-full rounded-b-md border-gray-200 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
          </fieldset>

          <div className="col-span-6">
            <button
              className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>    <Footer/>
    </>
  )
}

export default Checkout