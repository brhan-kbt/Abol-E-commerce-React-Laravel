import { Box, CircularProgress, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../Layout/Header'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import CoffeeForm from './ProductModule/CoffeeForm'
import axiosClient from '../axios'

const DeliveryPage = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [orders, setOrders] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const navigate=useNavigate();
    const handleRowClick = (params) => {
        const selectedRow = params.row;
        console.log(selectedRow);
        navigate(`/delivery/${selectedRow.id}`, { state: { selectedRow } }); // Navigate to the detail route and pass the selected row data as state
      
      };

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
      

      const handleDialogClose = () => {
        setSelectedProduct(null);
        setOpenDialog(false);
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
            headerName: "Customer Name",
            valueGetter: (params) => params.row.customer.customer.fullName,
            flex: 0.5,
        },
      
        {
            field: "status",
            headerName: "Order Status",
            flex: 0.5,
        },
         
        ];
  return (
    <>
    <Navbar/>
      <Box m="1.5rem 2.5rem">
          <Header title="Delivery" subtitle="Current Orders" />
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
      <Footer/>
    </>
  )
}

export default DeliveryPage