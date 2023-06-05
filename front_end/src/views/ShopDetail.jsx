import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axiosClient from '../axios'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useStateContext } from '../contexts/ContextProvider'
import loading from '../assets/loading.gif'
import { Rating } from '@mui/material'
import { Person2Rounded } from '@mui/icons-material'

const ShopDetail = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  
    const [activeTab, setActiveTab] = useState(2);
    const { id } = useParams();

    const {currentUser,addToCart}=useStateContext();


    const handleTabClick = (tabIndex) => {
      setActiveTab(tabIndex);
    };
    useEffect(() => {
      axiosClient.get(`/products/${id}`)
      .then(response => {
        const productData= response.data; 
        console.log('Products',productData);
        setProduct(productData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false)
      });
    }, [])

    const handleAddToCart=()=>{
      const productWithQuantity = { ...product.product, quantity: 1 };
      console.log(productWithQuantity);
      addToCart(productWithQuantity);
    }
  return (
    <>
    <Navbar/>


   {!isLoading&& <section class="text-gray-700 body-font overflow-hidden bg-white">
      <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={product.product.photo}/>
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest">{product.product.brand}</h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{product.product.productName}</h1>
            <span class="title-font font-medium text-2xl text-gray-900">{product.product.productType}</span>

            <div class="flex mb-4">
              <Rating value={product.average_rating}/>
            </div>
            <p class="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
          
            <div class="flex">
              <span class="title-font font-medium text-2xl text-gray-900">58.00 Birr / 1kg</span>
              <button class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"  onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      
    <div className="p-24 mx-auto -mt-20">
      <div className="border-b border-[#AF6215]">
        <nav className="-mb-px flex">
        <button
            className={`${
              activeTab === 1
                ? 'border rounded-lg border-[#AF6215]'
                : 'border-transparent'
            } ${
              activeTab === 1 ? 'rounded-tl-lg rounded-tr-lg' : ''
            } ml-8 py-4 px-6 inline-flex items-center text-sm font-medium leading-5 ${
              activeTab === 2 ? 'text-[#AF6215]' : 'text-gray-500'
            } border-b-2 focus:outline-none w-full`}
            onClick={() => handleTabClick(2)}
          >
            Review and Rating
          </button>
          <button
            className={`${
              activeTab === 2
                ? 'border rounded-lg border-[#AF6215]'
                : 'border-transparent'
            } ${
              activeTab === 2 ? 'rounded-tl-lg rounded-tr-lg' : ''
            } py-4 px-6 inline-flex items-center text-sm font-medium leading-5 ${
              activeTab === 2 ? 'text-[#AF6215]' : 'text-gray-500'
            } border-b-2 focus:outline-none w-full`}
            onClick={() => handleTabClick(1)}
          >
            Profile of Coffee Brand
          </button>
         
          {/* Add more tabs as needed */}
        </nav>
      </div>
      <div className="py-8">
        {/* Content for Tab 1 */}
        {activeTab === 1 && 
        
        <>
        {product.user &&
          <div class="">
          <div class="px-8 bg-white shadow ">
            <div class="mt-20 text-center border-b pb-12">
              <h1 class="text-4xl font-medium text-gray-700">{product.user.coffee_brand_owner.coffeeBrandName}</h1>
              <p class="font-light text-gray-600 mt-3">{product.user.coffee_brand_owner.address}</p>

              <p class="mt-8 text-gray-500">{product.user.username}</p>
            </div>


          </div>
        </div>}
        </>
        
        }

        {/* Content for Tab 2 */}
        {activeTab === 2 && 
        
        <>
       {product.product.reviews && 
        product.product.reviews.map((review)=>(
        <article>
              <div class="flex items-center mb-4 space-x-4">
                  <Person2Rounded class="w-10 h-10 rounded-full border-2 border-gray-700"/>
                  <div class="space-y-1 font-medium ">
                      <p>{review.user.username} <time datetime="2014-08-16 19:00" class="block text-sm text-gray-500 dark:text-gray-400">
                      Reviewed on {new Date(review.created_at).toLocaleString('default', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                        </time></p>
                  </div>
              </div>
              <div class="flex items-center mb-1">
                  <Rating value={review.rating} readOnly/>
              </div>
              <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400"><p>{review.message}</p></footer>
            
          </article>
          ))
        }{!product.product.reviews &&
          <h2>Be the first to review</h2>
        }
        </>
        }

      </div>
    </div>
    </section>}

    {isLoading &&
          <div className='flex align-items-center justify-center h-screen'>
            <img src={loading} alt="" srcset="" />
          </div>
    }

   <Footer/>
    
    </>
  )
}

export default ShopDetail