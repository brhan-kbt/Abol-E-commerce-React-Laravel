import { Add, Delete, Details, Edit } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CoffeeForm from './CoffeeForm';
import axiosClient from '../../axios';
import Header from '../../Layout/Header';
import { useNavigate } from 'react-router-dom';

const Coffee = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [errors,setErrors]=useState({});
    const handleProductFormSubmit = (product) => {
      if (product.id) {
        // product has an ID, perform edit operation
        console.log("Edit Product:", product);
        axiosClient
          .put(`/products/${product.id}`, product)
          .then((response) => {
            console.log(response);
            handleDialogClose();
            // Refetch the data for the DataGrid
            axiosClient.get('/products')
              .then(response => {
                const usersData = response.data;
                console.log('Products', usersData);
                setUsers(usersData);
                setIsLoading(false);
              })
              .catch(error => {
                console.error(error);
                setIsLoading(false)
              });
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // product doesn't have an ID, perform add operation
        console.log("Add product:", product);
        axiosClient
          .post('/products', product)
          .then((response) => {
            console.log(response);
            // Refetch the data for the DataGrid
            handleDialogClose();

            axiosClient.get('/products')
              .then(response => {
                const usersData = response.data;
                console.log('Products', usersData);
                setUsers(usersData);
                setIsLoading(false);
                 // Refetch the data for the DataGrid
                    axiosClient.get('/products')
                    .then(response => {
                      const usersData = response.data;
                      console.log('Products', usersData);
                      setUsers(usersData);
                      setIsLoading(false);
                    })
                    .catch(error => {
                      console.error(error);
                      setIsLoading(false)
                    });
              })
              .catch(error => {
                console.error(error);
                setIsLoading(false)
              });
          })
          .catch((error) => {
            if (error && error.response && error.response.data) {
              setErrors(error.response.data.errors);
              console.log(error.response.data.errors);
            }
            console.error(error);
          });
      }
    };
    
      

      const deleteRow = (id) => {
        // Display a confirmation dialog
        if (window.confirm("Are you sure you want to delete this user?")) {
          console.log("Deleted id:", id);
          axiosClient
            .delete(`/products/${id}`)
            .then((response) => {
              console.log(response);
              // Handle successful deletion
              
            })
            .catch((error) => {
              if (error && error.response && error.response.data) {
                setErrors(error.response.data.errors);
                console.log(error.response.data.errors);
              }
               console.error(error);
            });
        }
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

      const handleEdit = (user) => {
        setSelectedProduct(user);
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
          valueGetter: (params) => params.row.product.id,
        },
        {
          field: "productName",
          headerName: "Product Name",
          flex: 0.5,
          valueGetter: (params) => params.row.product.productName,
        },
        // {
        //   field: "productType",
        //   headerName: "Product Type",
        //   flex: 0.5,
        //   valueGetter: (params) => params.row.product.productType,
        // },
        {
          field: "productWeight",
          headerName: "Product Weight",
          flex: 0.5,
          valueGetter: (params) => params.row.product.productWeight,
        },
        {
          field: "brand",
          headerName: "Product Brand",
          flex: 0.5,
          valueGetter: (params) => params.row.product.brand,
        },
        {
          field: "status",
          headerName: "Status",
          flex: 0.3,
          renderCell: (params) => {
            const statusValue = params.row.product.status;
            const statusText = statusValue === 0 ? "Pending" : "Active";
            const textColor = statusValue === 0 ? "red" : "green";
            
            return (
              <Typography sx={{ color: textColor }}>{statusText}</Typography>
            );
          },
        },
        {
          field: "actions",
          headerName: "Actions",
          flex: 0.3,
          renderCell: (params) => {
            return (
              <Box>
                <IconButton sx={{ color: "green" }} onClick={() => handleEdit(params.row.product)}>
                  <Edit />
                </IconButton>
                <IconButton sx={{ color: "red" }} onClick={() => deleteRow(params.row.id)}>
                  <Delete />
                </IconButton>
                <IconButton sx={{ color: "orange" }} onClick={() => handleRowClick(params.row)}>
                  <Details />
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
        setErrors({});

      };

      const navigate=useNavigate();
      const handleRowClick=(params)=>{
        console.log("Hjhddkhfhk",params);
        const product=params;
        navigate('/product/detail',{state:{data:product}})
      }
    
  return (
    <>
    <Box m="1.5rem 2.5rem ">
        <div className='flex justify-between'>
        <Header title="Product/Coffee" subtitle="List of products" />
        <Button sx={{ backgroundColor: "green",height:'40px', color:'white','&:hover': {
            backgroundColor: 'darkgreen',
            color: 'lightGrey',
            },}} className='flex gap-2' onClick={handleButtonClick}><Add/> Add Product</Button>
        </div>
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
         <CoffeeForm
          role={selectedProduct}
          openDialog={openDialog}
          onClose={handleDialogClose}
          handleEdit={handleProductFormSubmit}
          handleAdd={handleProductFormSubmit}
          errors={errors}
        />
    </Box>
  </>
  )
}

export default Coffee