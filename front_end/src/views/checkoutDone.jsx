import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Header from '../Layout/Header';
import deliveryguy from '../assets/deliveryguy.gif'

export const CheckoutDone = () => {
    const location=useLocation();
    const {data}=location.state;

    console.log(data);

  return (
    <>
    <Navbar/>
    <Box m="1.5rem 2.5rem">
        <Header title="Checkout Done" subtitle="We're Coming!" />
        
      <Grid container mt={4}>
        
        <Grid xs={12} md={6} md:sx={{ paddingRight: '0px' }} paddingRight={5}>
          <img src={deliveryguy} alt="" srcset="" style={{width:'60%'}}/>
        </Grid>
        <Grid xs={12} md={3} md:sx={{ paddingRight: '0px' }} paddingRight={5}>
          <img src={deliveryguy} alt="" srcset="" />

        </Grid>
        <Grid xs={12} md={3} md:sx={{ paddingRight: '0px' }} paddingRight={5}>
          <Card 
           variant="outlined"
           sx={{
             backgroundColor: '',
             boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8)',
           }}
          >
            <CardContent>
                <Typography>Order ID: {data.id}</Typography>
                <Typography>Address: {data.address}</Typography>
                <Typography>Total Price: {data.totalprice}</Typography>
                <Typography>Payment Mode: {data.payment}</Typography>
                <Typography>Delivery: {data.delivery.name}</Typography>
            </CardContent>
          </Card>

        </Grid>
        </Grid>
   </Box>
   <Footer/>
    </>
  )
}
