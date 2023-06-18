import { createBrowserRouter, Navigate } from "react-router-dom";
import CoffeeBrand from "./admin/CoffeeBrand";
import Customer from "./admin/Customer";
import Dashboard from "./admin/Dashboard";
import MessageDetail from "./admin/MessageDetail";
import Messages from "./admin/Messages";
import Delivery from "./admin/OrderModule/Delivery";
import Order from "./admin/OrderModule/Order";
import OrderDetailAdmin from "./admin/OrderModule/OrderDetailAdmin";
import Payment from "./admin/OrderModule/Payment";
import Overview from "./admin/Overview";
import Advertisement from "./admin/ProductModule/Advertisement";
import Coffee from "./admin/ProductModule/Coffee";
import ProductDetail from "./admin/ProductModule/ProductDetail";
import ReviewRating from "./admin/ProductModule/ReviewRating";
import Subscription from "./admin/ProductModule/Subscription";
import Role from "./admin/Roles";
import GuestLayout from "./components/GuestLayout";
import Layout from "./Layout/Layout";
import About from "./views/About";
import Cart from "./views/Cart";
import Checkout from "./views/checkout";
import { CheckoutDone } from "./views/checkoutDone";
import CoffeeBrandDashborad from "./views/coffebrand/coffebranddashboard";
import Advert from "./views/coffebrand/postadvert";
import Product from "./views/coffebrand/postproduct";
import Contact from "./views/Contact";
import CustomerDashboard from "./views/customer/customerdashboard";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Shop from "./views/Shop";
import ShopDetail from "./views/ShopDetail";
import DeliveryPage from "./admin/DeliveryPage";
import DeliveryDetailPage from "./admin/DeliveryDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/shop",
    element: <Shop />,
  },

  {
    path: "/cart",
    element: <Cart />,
  },

  {
    path: "/coffee-brand/dashboard",
    element: <CoffeeBrandDashborad />,
  },
  {
    path: "/coffee-brand/post",
    element: <Product />,
  },
  {
    path: "/coffee-brand/advert",
    element: <Advert />,
  },
  {
    path: "/customer/dashboard",
    element: <CustomerDashboard />,
  },

  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/checkout/done",
    element: <CheckoutDone />,
  },

  {
    path: "/shop/:id",
    element: <ShopDetail />,
  },
 
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/delivery",
    element: <DeliveryPage />,
  },
  {
    path: "/delivery/:id",
    element: <DeliveryDetailPage />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard/>,
      },
      {
        path: "/overview",
        element: <Overview />,
      },
      {
        path: "/customers",
        element: <Customer />,
      },
      {
        path: "/coffee_brand",
        element: <CoffeeBrand />,
      },

      {
        path: "/roles",
        element: <Role />,
      },

      
      {
        path: "/product",
        element: <Coffee />,
      },

      {
        path: "/product/detail",
        element: <ProductDetail />,
      },

      {
        path: "/subscription",
        element: <Subscription />,
      },

      {
        path: "/advertisement",
        element: <Advertisement />,
      },
      {
        path: "/review&rating",
        element: <ReviewRating />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },



      {
        path: "/order",
        element: <Order />,
      },

      {
        path: "/order/:id",
        element: <OrderDetailAdmin />,
      },

      {
        path: "/delivery",
        element: <Delivery />,
      },
      {
        path: "/messages/detail",
        element: <MessageDetail />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
     
    ],
  },

  {
    path: "/",
    element: <GuestLayout />,
    children: [
        {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
    ],
  },
 
]);

export default router;
