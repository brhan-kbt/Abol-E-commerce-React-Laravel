import { Add, Delete, Edit } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axiosClient from '../../axios';
import Header from '../../Layout/Header';
import ProductForm from './forms/productForm';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useStateContext } from '../../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';

const Product = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {currentUser,userToken}=useStateContext();

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [errors,setErrors]=useState({});
    const [limit_errors,setLimitErrors]=useState('');

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

    const handleProductFormSubmit = (product) => {
        if (product.id) {
          // product has an ID, perform edit operation
          console.log(" Edit Product:", product);
           axiosClient.put(`/products/${product.id}`, product)
             .then(response => {
               console.log(response)
               fetchData();
               handleDialogClose();
               
             })
             .catch(error => {
              if (error && error.response && error.response.data) {
                setErrors(error.response.data.errors);
                console.log(error.response.data.errors);
              }

              if (error && error.response && error.response.data && error.response.data.limit_error) {
                setLimitErrors(error.response.data.errors.limit_error);
                console.log(error.response.data.errors.limit_error);
              }
               console.error(error);
               
             });
        } else {
          // product doesn't have an ID, perform add operation
          console.log("Add product:", product);
           axiosClient.post('/products', product)
             .then(response => {
               console.log(response)
               if(response &&  response.data &&  response.data.limit_error){
                setLimitErrors(response.data.limit_error);
                console.log(response.data.limit_error);
               }
               fetchData();
               handleDialogClose();
             })
             .catch(error => {
              if (error && error.response && error.response.data) {
                setErrors(error.response.data.errors);
                console.log(error.response.data.errors);
              }

              
               console.error(error);
              
              });
        }
      }
      
      const fetchData = () => {
        setIsLoading(true); // Show loading state
        axiosClient.get(`/products/user/${currentUser.id}`)
          .then(response => {
            const usersData= response.data.data; 
            console.log('ProductsOfUser:',usersData.data);
            setUsers(usersData);
            setIsLoading(false);
          })
          .catch(error => {
            console.error(error);
            setIsLoading(false)
          });
      };


      const deleteRow = (id) => {
        // Display a confirmation dialog
        if (window.confirm("Are you sure you want to delete this product?")) {
          console.log("Deleted id:", id);
          axiosClient
            .delete(`/products/${id}`)
            .then((response) => {
              console.log(response);
                fetchData();
               handleDialogClose();
              // Handle successful deletion
              
            })
            .catch((error) => {
              // Handle errors
              console.error(error);
            });
        }
      };
      

    useEffect(() => {
          axiosClient.get(`/products/user/${currentUser.id}`)
          .then(response => {
            const usersData= response.data.data; 
            console.log('ProductsOfUser:',usersData.data);
            setUsers(usersData);
            setIsLoading(false);
          })
          .catch(error => {
            console.error(error);
            setIsLoading(false)
          });
      }, []); 
      console.log(users);

      const handleEdit = (post) => {
        console.log(post);
        setSelectedProduct(post);
        setOpenDialog(true);
      };
    
      useEffect(() => {
        // handleEdit(selectedProduct);
      }, [selectedProduct]);
    
      const handleDialogClose = () => {
        setSelectedProduct(null);
        setOpenDialog(false);
      };

    const columns = [
    {
        field: "id",
        headerName: "ID",
        flex: 0.1,
    },
     {
     field: "productName",
     headerName: "Product Name",
     flex: 0.5,
     },
     {
      field: "photo",
      headerName: "Product Photo",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <img
            
            src={params.value}
            alt="Product"
            style={{ width: 50, height: 50,borderRadius:50 }}
          />
        );
      },
    },
     {
        field: "productType",
        headerName: "Product Type",
        flex: 0.5,
    },
    {
        field: "productWeight",
        headerName: "Product Weight",
        flex: 0.5,
    }, 
        
    {
     field: "brand",
     headerName: "Product Brand",
     flex: 0.5,
     },
     
    {
        field: "actions",
        headerName: "Actions",
        flex: 0.3,
        renderCell: (params) => {
        return (
            <Box>
            <IconButton sx={{ color: "green" }} onClick={() => handleEdit(params.row)}>
              <Edit />
            </IconButton>
            <IconButton sx={{ color: "red" }} onClick={() => deleteRow(params.row.id)}>
              <Delete />
            </IconButton>
            </Box>
        );
        },
    },
    ];
    const handleButtonClick = () => {
        setSelectedProduct({}); // Reset selectedProduct to null
        console.log('clicked');
        setOpenDialog(true);

      };
    
  return (
    <>
    <Navbar/>
    <Box m="1.5rem 2.5rem ">
        <div className='flex justify-between'>
        <Header title="Product" subtitle="List of your products" />
        <Button sx={{ backgroundColor: "green",height:'40px', color:'white','&:hover': {
            backgroundColor: 'darkgreen',
            color: 'lightGrey',
            },}} className='flex gap-2' onClick={handleButtonClick}><Add/> Add Product</Button>
        </div>
        {
          limit_errors &&(
            <h3 className='text-red-500 text-center font-bold'>{limit_errors}</h3>
          )
        }
    </Box>
    <Box
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
              rows={users}
              columns={columns}
            />
        )}
         <ProductForm
          product={selectedProduct}
          openDialog={openDialog}
          onClose={handleDialogClose}
          handleEdit={handleProductFormSubmit}
          handleAdd={handleProductFormSubmit}
          errors={errors}
        />
    </Box>
    <Footer/>
  </>
  )
}

export default Product