import { CoffeeRounded, GraphicEqTwoTone, PeopleAltOutlined, PeopleOutline, ShoppingBag } from '@mui/icons-material';
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosClient from '../axios';
import { useStateContext } from '../contexts/ContextProvider';
import Header from '../Layout/Header'

const Dashboard = () => {

  const {currentUser,setCurrentUser}=useStateContext()
  const [customer,setCustomer]=useState([]);
  const [coffeebrand,setCoffeebrand]=useState([]);
  const [products,setProducts]=useState([]);
  const [adverts,setAdverts]=useState([]);
  const [order,setOrder]=useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersResponse, productsResponse, coffeeBrandResponse, orderResponse, advertsResponse] = await Promise.all([
          axiosClient.get('/customers'),
          axiosClient.get('/products'),
          axiosClient.get('/coffee_brand'),
          axiosClient.get('/orders'),
          axiosClient.get('/adverts')
        ]);
  
        const customersData = customersResponse.data.data;
        const productsData = productsResponse.data;
        const coffeeBrandData = coffeeBrandResponse.data.data;
        const orderData = orderResponse.data.data;
        const advertsData = advertsResponse.data;
  
        // Sort products in descending order based on average_rating and order_items_count
        
        setCustomer(customersData);
        setProducts(productsData);
        setCoffeebrand(coffeeBrandData);
        setOrder(orderData);
        setAdverts(advertsData);

        setLoading(false);
        
        console.log('Length of customersData:', customersData);
        console.log('Length of productsData:', productsData);
        console.log('Length of coffeeBrandData:', coffeeBrandData);
        console.log('Length of orderData:', orderData);
        console.log('Length of advertsData:', advertsData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="Overall Report" subtitle="" />
        <div className='flex flex-wrap gap-8'>
          <div class="h-44 w-44 bg-gray-700 text-white rounded-xl flex flex-col justify-center shadow duration-300 hover:bg-[#B8691A] hover:text-black hover:shadow-xl flex justify-center">
              <div className='flex justify-center'>
                <PeopleAltOutlined sx={{height:'60px',fontSize:'300px'}} />
              </div>
              {!loading ? (
                  <span class="mt-6 text-sm leading-5 font-semibold text-center flex justify-center">
                    {customer.length}<br/>
                    Total Customers
                  </span>
                ) : (
                  <div className='flex justify-center'>Loading...</div>
                )}
          </div>
          <div class="h-44 w-44 bg-gray-700 text-white rounded-xl flex flex-col justify-center shadow duration-300 hover:bg-[#B8691A] hover:text-black hover:shadow-xl flex justify-center">
              <div className='flex justify-center'>
                <PeopleOutline sx={{height:'60px',fontSize:'300px'}} />
              </div>
               {!loading ? (
                  <span class="mt-6 text-sm leading-5 font-semibold text-center flex justify-center">
                    {coffeebrand.length}<br/>
                    Total Coffee Brands
                  </span>
                ) : (
                  <div className='flex justify-center'>Loading...</div>
                )}
          </div>

          <div class="h-44 w-44 bg-gray-700 text-white rounded-xl flex flex-col justify-center shadow duration-300 hover:bg-[#B8691A] hover:text-black hover:shadow-xl flex justify-center">
            <div className='flex justify-center'>
              <ShoppingBag sx={{height:'60px',fontSize:'300px'}} />
            </div>
            {!loading ? (
                  <span class="mt-6 text-sm leading-5 font-semibold text-center flex justify-center">
                    {order.length}<br/>
                    Total Orders
                  </span>
                ) : (
                  <div className='flex justify-center'>Loading...</div>
                )}
          </div>

          
          <div class="h-44 w-44 bg-gray-700 text-white rounded-xl flex flex-col justify-center shadow duration-300 hover:bg-[#B8691A] hover:text-black hover:shadow-xl flex justify-center">
            <div className='flex justify-center'>
              <CoffeeRounded sx={{height:'60px',fontSize:'300px'}} />
            </div>
            {!loading ? (
                  <span class="mt-6 text-sm leading-5 font-semibold text-center flex justify-center">
                    {products.length}<br/>
                    Total Products
                  </span>
                ) : (
                  <div className='flex justify-center'>Loading...</div>
                )}
          </div>

          <div class="h-44 w-44 bg-gray-700 text-white rounded-xl flex flex-col justify-center shadow duration-300 hover:bg-[#B8691A] hover:text-black hover:shadow-xl flex justify-center">
            <div className='flex justify-center'>
              <GraphicEqTwoTone sx={{height:'60px',fontSize:'300px'}} />
            </div>
            {!loading ? (
                  <span class="mt-6 text-sm leading-5 font-semibold text-center flex justify-center">
                    {products.length}<br/>
                    Total Adverts
                  </span>
                ) : (
                  <div className='flex justify-center'>Loading...</div>
                )}
          </div>
          
        </div>

   </Box>
  )
}

export default Dashboard