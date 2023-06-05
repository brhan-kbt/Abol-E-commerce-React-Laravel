import { Add, Delete, Edit } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axiosClient from '../../axios';
import Header from '../../Layout/Header';
import CoffeeForm from '../ProductModule/CoffeeForm';
import DeliveryForm from './DeliveryForm';

const Delivery = () => {
    const [users, setDelivery] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleDeliveryFormSubmit = (delivery) => {
        if (delivery.id) {
          // delivery has an ID, perform edit operation
          console.log(" Edit delivery:", delivery);
           axiosClient.put(`/delivery/${delivery.id}`, delivery)
             .then(response => {
               console.log(response)
               handleDialogClose();
             })
             .catch(error => {
               console.error(error);
             });
        } else {
          // delivery doesn't have an ID, perform add operation
          console.log("Add delivery:", delivery);
           axiosClient.post('/delivery', delivery)
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
            .delete(`/delivery/${id}`)
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
        axiosClient.get('/delivery')
          .then(response => {
            const usersData= response.data.data; 
            console.log('Delivery:',usersData);
            setDelivery(usersData);
            setIsLoading(false);
          })
          .catch(error => {
            console.error(error);
            setIsLoading(false)
          });
      }, []); 
      console.log(users);

      const handleEdit = (user) => {
        setSelectedDelivery(user);
        setOpenDialog(true);
      };
    
      useEffect(() => {
        // handleEdit(selectedDelivery);
      }, [selectedDelivery]);
    
      const handleDialogClose = () => {
        setSelectedDelivery(null);
        setOpenDialog(false);
      };

    const columns = [
    {
        field: "id",
        headerName: "ID",
        flex: 0.1,
    },
     {
     field: "name",
     headerName: "Delivery Name",
     flex: 0.5,
     },
     {
      field: "address",
      headerName: "Delivery Address",
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
        setSelectedDelivery({}); // Reset selectedDelivery to null
        console.log('clicked');
        setOpenDialog(true);

      };
    
  return (
    <>
    <Box m="1.5rem 2.5rem ">
        <div className='flex justify-between'>
        <Header title="Order" subtitle="List of orders" />
        <Button sx={{ backgroundColor: "green",height:'40px', color:'white','&:hover': {
            backgroundColor: 'darkgreen',
            color: 'lightGrey',
            },}} className='flex gap-2' onClick={handleButtonClick}><Add/> Add Delivery</Button>
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
          <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <DataGrid
              getRowId={(row) => row.id}
              rows={users}
              columns={columns}
            />
          </Box>
        )}
         <DeliveryForm
          delivery={selectedDelivery}
          openDialog={openDialog}
          onClose={handleDialogClose}
          handleEdit={handleDeliveryFormSubmit}
          handleAdd={handleDeliveryFormSubmit}
        />
    </Box>
  </>
  )
}

export default Delivery