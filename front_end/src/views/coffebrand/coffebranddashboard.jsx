import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, Rating, Typography } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axiosClient from '../../axios'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { useStateContext } from '../../contexts/ContextProvider'
import Header from '../../Layout/Header'

const CoffeeBrandDashborad = () => {
  
  const [isLoading, setIsLoading] = useState(true);
  const {currentUser,userToken}=useStateContext();

  const [product, setProduct] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [leastRated, setLeastRated] = useState([]);
  if (!userToken) {
    return <Navigate to="/login" />;
}
  if (currentUser.role.name !== 'coffeebrand') {
    if (currentUser.role.name === 'admin') {
      return <Navigate to="/dashboard" />;
    } else if (currentUser.role.name === 'customer') {
      return <Navigate to="/customer/dashboard" />;
    } else {
      return <Navigate to="/login" />;
    }
  }

  useEffect(() => {
      axiosClient.get(`/productsbyrating/user/${currentUser.id}`)
      .then(response => {
        const prod= response.data;
        console.log('Products by Rating :',prod);
        setProduct(prod);
        setTopRated(prod[0]); // Assign the first index to topRated
        console.log('top',topRated);
        setLeastRated(prod[prod.length - 1]); // Assign the last index to leastRated
        console.log('least',leastRated);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false)
      });
  }, []); 

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.1,
      valueGetter: (params) => params.row.id,
    },
    {
      field: "productName",
      headerName: "Product Name",
      flex: 0.5,
      valueGetter: (params) => params.row.productName,
    },
    {
      field: "photo",
      headerName: "Product Photo",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <img
            src={params.row.photo}
            alt="Product"
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
        );
      },
    },
    {
      field: "productType",
      headerName: "Product Type",
      flex: 0.5,
      valueGetter: (params) => params.row.productType,
    },
    {
      field: "productWeight",
      headerName: "Product Weight",
      flex: 0.5,
      valueGetter: (params) => params.row.productWeight,
    },
    {
      field: "brand",
      headerName: "Product Brand",
      flex: 0.5,
      valueGetter: (params) => params.row.brand,
    },
    {
      field: 'average_rating',
      headerName: 'Average Rating',
      flex: 0.5,
      renderCell: (params) => (
        <Rating
          name={`rating-${params.row.id}`}
          value={params.row.average_rating}
          precision={0.5}
          readOnly
        />
      ),
    },
    {
      field: "order_items_count",
      headerName: "Order Count",
      flex: 0.5,
      valueGetter: (params) => params.row.order_items_count,
    },
   
   
  ];

  return (
    <>
    <Navbar/>
      <Box m="1.5rem 2.5rem">
          <Header title="Dashboard" subtitle="Overall Report" />
      </Box>
      <Box m="1.5rem 2.5rem">
      <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        {topRated&& topRated.average_rating&&
        <Card sx={{backgroundColor:'green',color:'white'}}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <CardMedia component="img" style={{height:'200px'}} image={topRated.photo} alt="Product Image" />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Top Rated Product
              </Typography>
              <Typography variant="body2" component="div" gutterBottom>
               Product Name: {topRated.productName}
              </Typography>

              {topRated.average_rating && 
                <Rating value={topRated.average_rating} precision={0.5} readOnly/>
              }
              <Typography variant="body2" >
              Ordered: <strong>{topRated.order_items_count}</strong>  times
              </Typography>
              <Typography variant="body2" >
              Product Brand: {topRated.brand}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
        </Card>}
      </Grid>
      <Grid item md={6} xs={12}>
      {leastRated && leastRated.productName &&
        <Card sx={{backgroundColor:'crimson',color:'white'}}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <CardMedia component="img" style={{height:'200px'}} image={leastRated.photo} alt="Product Image" />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Least Rated Product
              </Typography>
              <Typography variant="body2" component="div" gutterBottom>
               Product Name: {leastRated.productName}
              </Typography>
               <Rating value={leastRated.average_rating} precision={0.5} readOnly/>
              <Typography variant="body2" >
              Ordered: <strong>{leastRated.order_items_count}</strong>  times
              </Typography>
              <Typography variant="body2" >
              Product Brand: {leastRated.brand}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
        </Card>}
      </Grid>
    </Grid>
      </Box>
      <Box
          padding='40px'
          pt='0px'
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
               border: 1,
               overflowX: "auto",
            },
            "& .MuiDataGrid-cell": {
              borderBottom:2,
              color:'black',
              borderColor: "red", // Specify the border color for the cells
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: 'lightGrey',
              color: 'black',
              fontWeight:'bold',
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: '',
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: 'lightGrey',
              color: 'black',
              fontWeight:'bold'
              // borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                borderColor:'black'

            },
          }}
        >
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        ) : (
            <DataGrid
                        getRowId={(row) => row.id}
                        rows={product}
                        columns={columns}
                        slots={{
                          toolbar: GridToolbar,
                        }}
                      />
        )}
      </Box>
    <Footer/>
    </>
  )
}

export default CoffeeBrandDashborad