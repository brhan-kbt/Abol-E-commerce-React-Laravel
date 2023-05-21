import { createBrowserRouter, Navigate } from "react-router-dom";
import CoffeeBrand from "./admin/CoffeeBrand";
import Customer from "./admin/Customer";
import Dashboard from "./admin/Dashboard";
import Overview from "./admin/Overview";
import Coffee from "./admin/ProductModule/Coffee";
import Role from "./admin/Roles";
import GuestLayout from "./components/GuestLayout";
import Layout from "./Layout/Layout";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
