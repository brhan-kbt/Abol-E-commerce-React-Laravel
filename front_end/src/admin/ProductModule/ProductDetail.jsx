import { Box, Card, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../Layout/Header'

const ProductDetail = () => {
    const location=useLocation();
    const {data}=location.state;
    console.log(data.product.reviews);
  return (
    <>
    <Box m="1.5rem 2.5rem">
        <Header title="Product Detail" />
    </Box>
    
    <Box m="1.5rem 2.5rem">
        <Grid container spacing={2}>
            <Grid item xs={6}>
            <Card>
                <CardMedia
                    sx={{ height: 200 }}
                    image={data.product.photo}
                    title="green iguana"
                />
                <CardContent>
                    <div className='flex align-items'>
                    <Typography>Average Rating :</Typography>
                    <Rating
                        value={data.average_rating}  
                        precision={0.5}  
                        readOnly                
                    />

                    </div>
                    <Typography>Order Count: {data.order_items_count}</Typography>
                    <Typography>Product Name: {data.product.productName}</Typography>
                    <Typography>Product Type: {data.product.productType}</Typography>
                    <Typography>Product Weight: {data.product.productWeight}</Typography>
                    <Typography>Product Price: {data.product.price}</Typography>
                </CardContent>
            </Card>

           
            </Grid>
            <Grid item xs={6}>
                <Typography className='flex justify-content'><h1>Review and Rating</h1></Typography>

                {data.product.reviews.map((record) => (

                    <Card key={record.id}>
                    <CardContent>
                        <div className='flex gap-4'>
                            <Typography>Rating: <Rating value={record.rating} readOnly/></Typography>
                        </div>
                        <Typography>Message: {record.message}</Typography>
                        <Typography>  Date: {new Date(record.created_at).toLocaleString()}</Typography>
                    </CardContent>
                    </Card>
                ))}
                </Grid>

        </Grid>
       
    </Box>

    </>
  )
}

export default ProductDetail