import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useStateContext } from '../contexts/ContextProvider'

const Cart = () => {

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
  return (
    <>
    <Navbar/>
      <div class="relative bg-gray-100 pt-20">
      <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div class="rounded-lg md:w-2/3">

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
        </div>
        <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
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
    <Footer/>
    </>
  )
}

export default Cart