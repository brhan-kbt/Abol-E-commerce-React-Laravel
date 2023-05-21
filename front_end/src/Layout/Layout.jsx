import { Box, useMediaQuery } from '@mui/material'
import React,{useState} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import Navbar from './Navbar'
// import {useSelector} from 'react-redux'
import Sidebar from './Sidebar'
// import Navbar from '../components/Navbar'
//  import Sidebar from '../components/Sidebar'
// import { useGetUserQuery } from '../../../state/api'

const Layout = () => {
  const isNonMobile=useMediaQuery("(min-width:760px)");
  const [isSidebarOpen,setIsSidebarOpen]=useState(true);


  const {userToken}=useStateContext();
  if (!userToken) {
    return  <Navigate to='/login'/>
  }
//   const userId=useSelector((state)=>state.global.userId);
//   const {data}=useGetUserQuery(userId);
//   console.log('data',data);
  return (
    <Box display={isNonMobile?"flex":"block"} width='100%' height='100%' sx={{backgroundColor:'white'}}>
      
      <Sidebar
        // user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      
      <Box flexGrow={1}>
        <Navbar
        //   user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet/>

      </Box>
    </Box>
  )
}

export default Layout