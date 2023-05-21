import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import axiosClient from '../axios';
import Header from '../Layout/Header'

const Dashboard = () => {
  // useEffect(() => {
  //   axiosClient.get('/users')
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="Dashboard" subtitle="Overall Report" />
   </Box>
  )
}

export default Dashboard