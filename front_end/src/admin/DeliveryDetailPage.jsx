import { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Select, MenuItem } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import axiosClient from '../axios';
import Header from '../Layout/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const DeliveryDetailPage = () => {
  const location = useLocation();
  const selectedRowData = location.state && location.state.selectedRow;

  const [status, setStatus] = useState(selectedRowData.status);

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    updateOrderStatus(newStatus);
  };

  const updateOrderStatus = async (newStatus) => {
    console.log(newStatus);
    try {
      const response = await axiosClient.patch(`/orders/${selectedRowData.id}`, {
        status: newStatus,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getStatusColor = () => {
    return status === 'pending' ? 'red' : 'green';
  };
  console.log(selectedRowData);

  return (
    <>
    <Navbar/>
    <Box m="1.5rem 2.5rem">
      <Header title="Order" subtitle="Order Detail" />

      <Grid container mt={4}>
        <Grid xs={12} md={6} md:sx={{ paddingRight: '0px' }} paddingRight={5}>
          <Card
            variant="outlined"
            sx={{
              backgroundColor: '',
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8)',
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: '700' }}>
                Order Detail
              </Typography>
              {selectedRowData && (
                <Box>
                  <Typography>Order Id: {selectedRowData.id}</Typography>
                  <Typography>Order Address: {selectedRowData.address}</Typography>
                  <Typography>Customer Name: {selectedRowData.customer.customer.fullName}</Typography>
                  <Typography >
                    Status:{' '} {selectedRowData.status}
                    
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid xs={12} md={6} md:sx={{ paddingRight: '0px' }} paddingRight={5}>
          <Card
            variant="outlined"
            sx={{
              backgroundColor: '',
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8)',
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: '700' }}>
                Delivery Entity
              </Typography>
              {selectedRowData.delivery && (
                <Box>
                  <Typography>Delivery Id: {selectedRowData.delivery.id}</Typography>
                  <Typography>Delivery Name: {selectedRowData.delivery.name}</Typography>
                  <Typography>Delivery Address: {selectedRowData.delivery.address}</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid> */}

        <Grid xs={12} paddingTop={5}>
          <Card
            variant="outlined"
            sx={{
              backgroundColor: '',
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8)',
            }}
          >
            <CardContent>
              <>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: '700' }}>
                  Products Detail
                </Typography>
                {selectedRowData.items.map((record, index) => (
                  <Card key={index} variant="outlined" sx={{ my: 1, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <CardContent sx={{ backgroundColor: 'transparent' }}>
                      <Typography gutterBottom variant="h6" component="div">
                        Product Name: {record.product.productName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {record.quantity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: {record.price}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
    <Footer/>
    </>
  );
};

export default DeliveryDetailPage;
