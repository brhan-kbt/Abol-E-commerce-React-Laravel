import { Navigate, Outlet } from "react-router-dom";
import logo from '../assets/tlogo1.png';
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function GuestLayout() {
  

  // if(userToken){
  //   return <Navigate to='/' />
  // }

  return (
    <>
    <Navbar/>
    <div>
     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src={logo}
            alt="Your Company"
          />
        </div>
        <Outlet/>
      </div>
    </div>
    <Footer/>
    </>
  )
}
