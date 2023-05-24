import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Product from '../components/product'
// import { useStateValue } from "../components/stateProvider";

const Home = () => {
  // const { user } = useStateValue();
  const [products, setProducts] = useState([]);
  useEffect(() => {
      axios
          .get("http://localhost:5000/products")
          .then((res) => {
              setProducts(res.data);
              
          })
          .catch((err) => {
              console.log(err);
          });
  }, []);


  return (
    <>
    <Navbar/>
    <section className='h-screen'>
     <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-center">
                {/* map products with product cards */}
                {products.map((product) => (
                    <Product
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        image={product.image}
                        price={product.amount}
                        rating={product.rating}
                    />
                ))}
            </div>
    </section>
    <Footer/>
    </>
  )
}

export default Home