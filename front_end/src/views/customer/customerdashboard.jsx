import { Delete, Edit, Reviews } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Rating, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios';
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { useStateContext } from '../../contexts/ContextProvider';
import Header from '../../Layout/Header';

const CustomerDashboard = () => {

  const {currentUser}  = useStateContext();
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axiosClient.get(`/orders/${currentUser.id}`)
      .then(response => {
        console.log('Order:',response.data.data);
        setOrder(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []); 

  const [selectedRowData, setSelectedRowData] = useState(null);
  const handleRowClick = (params) => {
    const selectedRowData = params.row;
    setSelectedRowData(selectedRowData);
    console.log(selectedRowData);
    // navigate("/maintenance/requests", { state: { selectedRowData } }); // Navigate to the detail route and pass the selected row data as state
  
  };
  console.log("CurrentUserID",currentUser.id);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    message:'',
    rating:0,
    product_id:'',
    user_id:currentUser.id
  });

  const handleOpen = (productId) => {
    setFormData((prevState) => ({
      ...prevState,
      product_id: productId,
    }));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axiosClient.get('/products')
      .then(response => {
        const usersData= response.data; 
        console.log('Products',usersData);
        setUsers(usersData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false)
      });
  }, []); 
  console.log(users);

  const columns = [
    {
        field: "id",
        headerName: "ID",
        flex: 0.1,
    },
     {
     field: "address",
     headerName: "Address",
     flex: 0.5,
     },
     {
      field: "fullName",
      headerName: "Full Name",
      flex: 0.5,
      valueGetter: (params) => params.row.customer ? params.row.customer.customer.fullName : "",
      },
     {
      field: "status",
      headerName: "Status",
      flex: 0.5,
    },
     
    ];

    const GiveReview=()=>{
    console.log(formData);
    axiosClient.post('/reviews', formData)
     .then(response => {
       console.log(response)
       handleClose();
     })
     .catch(error => {
       console.error(error);
     });
    }
  
  return (

    <>
    <Navbar/>
      <Box m="3rem 2.5rem">
          <Header title="Customer Dashboard" style="padding:30px !important;"/>
          
          <div className='flex '>
          <Box
          className='w-1/2'
          padding='40px'
          pt='0px'
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
               border: 1,
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
              rows={order}
              columns={columns}
              onRowClick={handleRowClick}
            />
        )}
          </Box>
          <Box className='w-1/2'>
          
                       {selectedRowData && <>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: '700' }}>Order Detail</Typography>
                            {/* Render tenant history cards */}
                            {selectedRowData.items.map((record, index) => (
                            // Render tenant history card
                            <Card key={index} variant="outlined" sx={{ my: 1,boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                <CardContent sx={{backgroundColor:'transparent', }}>
                                {/* <Typography gutterBottom variant="h6" component="div">Order Date: {record.created_at}</Typography> */}
                                <Typography gutterBottom variant="body2" component="div">Price: {record.price}</Typography>
                                <Typography gutterBottom variant="body2" component="div">Quantity: {record.quantity}</Typography>
                                {record.product && 
                                      <>
                                    <Typography variant="body2" >Product Name: {record.product.productName}</Typography>
                                    <Typography variant="body2" >Product Type: {record.product.productType}</Typography>
                                    <Typography variant="body2" >Product Weight: {record.product.productWeight}</Typography>
                                    <CardActions className='flex justify-end'>
                                        <Button onClick={() => handleOpen(record.product.id)}  variant='contained' color='secondary' size="small"> 
                                        <Reviews sx={{paddingRight:'4px'}}/> Review
                                        </Button>
                                    </CardActions>
                                      </>
                                }
                                </CardContent>
                            </Card>
                            ))}
                        </>}
          </Box>
          </div>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Review Form</DialogTitle> */}
        <DialogContent>
          <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Please provide your feedback and rating for this product:
          </Typography>

          <Typography variant="body1" gutterBottom>
            Rate and Review
          </Typography>
          <Rating
            name="rating"
            value={formData.rating}
            onChange={(event, newValue) => {
              setFormData((prevState) => ({
                ...prevState,
                rating: newValue,
              }));
              
            }}
            precision={0.5}
          />
          <TextareaAutosize
            style={{ width: '100%', height: '150px', borderRadius: '5px' }}
            rows={10}
            placeholder="Enter your message"
            value={formData.message}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                message: e.target.value,
              }));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={GiveReview} variant="contained" color='secondary'  autoFocus>
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>

    <Footer/>
    </>
  )
}

export default CustomerDashboard