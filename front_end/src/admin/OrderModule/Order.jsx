import { Add, Delete, Edit } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axiosClient from '../../axios';
import Header from '../../Layout/Header';
import CoffeeForm from '../ProductModule/CoffeeForm';
import { useNavigate } from 'react-router-dom';

const Order = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [orders, setOrders] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const navigate=useNavigate();
    const handleProductFormSubmit = (product) => {
        if (product.id) {
          // product has an ID, perform edit operation
          console.log(" Edit Product:", product);
           axiosClient.put(`/products/${product.id}`, product)
             .then(response => {
               console.log(response)
               handleDialogClose();
             })
             .catch(error => {
               console.error(error);
             });
        } else {
          // product doesn't have an ID, perform add operation
          console.log("Add product:", product);
           axiosClient.post('/products', product)
             .then(response => {
               console.log(response)
             })
             .catch(error => {
               console.error(error);
             });
        }
      }
      

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
              // Handle errors
              console.error(error);
            });
        }
      };
      

    useEffect(() => {
        axiosClient.get('/orders')
          .then(response => {
            console.log('Orders:',response.data.data);
            setOrders(response.data.data);
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
    },
     {
     field: "address",
     headerName: "Address",
     flex: 0.5,
     },
     
     {
        field: "status",
        headerName: "Order Status",
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

        const handleRowClick = (params) => {
          const selectedRow = params.row;
          console.log(selectedRow);
          navigate(`/order/${selectedRow.id}`, { state: { selectedRow } }); // Navigate to the detail route and pass the selected row data as state
        
        };
    
  return (
    <>
    <Box m="1.5rem 2.5rem ">
        <div className='flex justify-between'>
        <Header title="Order" subtitle="List of orders" />
        {/* <Button sx={{ backgroundColor: "green",height:'40px', color:'white','&:hover': {
            backgroundColor: 'darkgreen',
            color: 'lightGrey',
            },}} className='flex gap-2' onClick={handleButtonClick}><Add/> Add Product</Button> */}
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
              rows={orders}
              columns={columns}
              onRowClick={handleRowClick}
            />
        )}
         <CoffeeForm
          role={selectedProduct}
          openDialog={openDialog}
          onClose={handleDialogClose}
          handleEdit={handleProductFormSubmit}
          handleAdd={handleProductFormSubmit}
        />
    </Box>
  </>
  )
}

export default Order