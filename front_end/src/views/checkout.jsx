import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useStateContext } from '../contexts/ContextProvider'

const Checkout = () => {
  const [deliveryOption, setDeliveryOption] = useState('');

  const {currentUser,cartItems,setCartItems}=useStateContext();
  console.log(cartItems);
  const handleQuantityChange = (itemId, quantity) => {
    // Find the item in the cartItems array
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        // Update the quantity of the item
        return { ...item, quantity };
      }
      return item;
    });


    // Update the cart items with the new quantity
    setCartItems(updatedCartItems);
  };
  
  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateVAT = () => {
    const totalCost = calculateTotalCost();
    return totalCost * 0.15; // Calculate VAT as 15% of the total cost
  };

  const removeItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };
  const handleDeliveryOptionChange = (event) => {
    setDeliveryOption(event.target.value);
  };


  const orderData = {
    user_id: currentUser.id, // Get customer details from form inputs
    products: cartItems.map((item) => ({
      name: item.id,
      quantity: item.quantity,
      product_id:item.id
    })),
    address:'AA',
    status:'pending'
  };

  const submitOrder=(e)=>{
    e.preventDefault();
    console.log(orderData);
    axiosClient.post(`/orders`,orderData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <>
    <Navbar/>

<section>

  <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
    <div className="bg-gray-100 my-12 py-5 mx-10">
        <h1 className='font-bold text-xl text-center mb-5 border-b border-[#BA6D20]'>Order Summary</h1>
          <div class=" rounded-lg px-16">
          {cartItems  && cartItems.map((items)=>{
                return (<div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <img src={items.photo} alt="product-image" class="w-full rounded-lg sm:w-40" />
                    <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div class="mt-5 sm:mt-0">
                        <h2 class="text-lg font-bold text-gray-900">{items.productName}</h2>
                        <p class="mt-1 text-xs text-gray-700">Unit Price - {items.price}</p>
                      </div>
                      <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                                <span
                                  className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                  onClick={() =>
                                    handleQuantityChange(items.id, items.quantity - 1)
                                  }
                                >
                                  -
                                </span>
                                <span className='px-5'>{items.quantity}</span>
                                <span
                                  className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                  onClick={() =>
                                    handleQuantityChange(items.id, items.quantity + 1)
                                  }
                                >
                                  +
                                </span>
                              </div>
                        <div class="flex items-center space-x-4">
                          <p class="text-sm"> {items.quantity} * {items.price} = {items.quantity*items.price} ETB</p>
                          <svg xmlns="http://www.w3.org/2000/svg"  onClick={() => removeItem(items.id)} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>)
            })}

        <div class="mt-6 h-full rounded-lg border bg-white p-5  shadow-md md:mt-0 ">
          <h1 className='font-bold text-xl text-center mb-5 border-b border-[#BA6D20]'>Cart Summary</h1>
          <div class="mb-2 flex justify-between">
            <p class="text-gray-700">Subtotal</p>
            <p class="text-gray-700">ETB {calculateTotalCost().toFixed(2)} </p>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-700">VAT</p>
            <p class="text-gray-700">{calculateVAT().toFixed(2)}</p>
          </div>
          <hr class="my-4" />
          <div class="flex justify-between">
            <p class="text-lg font-bold">Total</p>
            <div class="">
              <p class="mb-1 text-lg font-bold">{(calculateTotalCost() + calculateVAT()).toFixed(2)}</p>
            </div>
          </div>
          <Link to={`/checkout`} className="mt-6 text-center w-full block rounded-md bg-[#BA6D20] py-1.5 font-medium text-blue-50 hover:bg-gray-700">Check out</Link>
        </div>    
        
      </div>
    </div>

    <div className="bg-gray-50 my-12 py-5 mx-10">
    <h1 className='text-center mb-10 text-xl'>Contact Information</h1>

      <div className="mx-auto max-w-lg px-4 lg:px-8">
        <form className="grid grid-cols-6 gap-4">
          

          <div className="col-span-12">
            <label
              htmlFor="LastName"
              className="block text-xs font-medium text-gray-700"
            >
              Full Name
            </label>

            <input
              type="text"
              id="LastName"
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            />
          </div>

          <div className="col-span-12">
            <label htmlFor="Email" className="block text-xs font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              id="Email"
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            />
          </div>

          <div className="col-span-12">
            <label htmlFor="Phone" className="block text-xs font-medium text-gray-700">
              Phone
            </label>

            <input
              type="tel"
              id="Phone"
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            />
          </div>


          <div className="col-span-12">
            <label htmlFor="Phone" className="block text-xs font-medium text-gray-700">
              Location
            </label>

            <input
              type="tel"
              id="Phone"
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            />
          </div>
            <div className="mb-4 col-span-12">
              <label htmlFor="deliveryOptions" className="block text-gray-700 mb-2">
                Delivery Options:
              </label>
              <select
                id="deliveryOptions"
                className="block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={deliveryOption}
                onChange={handleDeliveryOptionChange}
              >
                <option value=""> -- Select Delivery --</option>
                <option value="BEU">BEU</option>
                <option value="ASBEZA">ASBEZA</option>
              </select>
            </div>
       
            <div className="mb-4 col-span-12">
              <label htmlFor="deliveryOptions" className="block text-gray-700 mb-2">
                Payment Options:
              </label>
              <select
                id="deliveryOptions"
                className="block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={deliveryOption}
                onChange={handleDeliveryOptionChange}
              >
                <option value=""> -- Select Delivery --</option>
                <option value="telebirr">Telebirr</option>
                <option value="chapa">Chapa</option>
              </select>
            </div>
          <div className="col-span-12">
            <button
            onClick={submitOrder}
              className="text-center w-full block rounded-md bg-[#BA6D20] py-1.5 font-medium text-blue-50 hover:bg-gray-700 transition hover:shadow-lg"
            >
              Pay & Order
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