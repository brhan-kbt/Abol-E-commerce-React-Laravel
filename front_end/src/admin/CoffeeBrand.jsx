import { Delete, Edit } from '@mui/icons-material';
import { Box, CircularProgress, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosClient from '../axios';
import Header from '../Layout/Header'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditUser from './EditUser';
import EditCoffeeBrand from './EditCoffeeBrand';

const Customer = () => {
    const [users, setUsers] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

     const handleUserFormSubmit = (user) => {
       console.log("UPDATED User:", user);
       axiosClient.put(`/users/${user.id}`, user)
       .then(response => {
        console.log(response)
       })
       .catch(error => {
         // Handle errors
         console.error(error);
       });
        
     };
  
    useEffect(() => {
        axiosClient.get('/coffee_brand')
          .then(response => {
            const usersData= response.data.data; 
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
        setSelectedUser(user);
        setOpenDialog(true);
      };
    
      const deleteRow = (id) => {
        // Display a confirmation dialog
        if (window.confirm("Are you sure you want to delete this user?")) {
          console.log("UPDATED id:", id);
          axiosClient
            .delete(`/users/${id}`)
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
        // handleEdit(selectedUser);
      }, [selectedUser]);
    
      const handleDialogClose = () => {
        setSelectedUser(null);
        setOpenDialog(false);
      };
    const columns = [
    {
        field: "id",
        headerName: "ID",
        flex: 0.1,
    },
    {
    field: "coffeeBrandName",
    headerName: "Brand Name",
    flex: 0.5,
    valueGetter: (params) => params.row.coffeeBrandOwner ? params.row.coffeeBrandOwner.coffeeBrandName : "",
    },

    {
      field: "address",
      headerName: "Brand Address",
      flex: 0.5,
      valueGetter: (params) => params.row.coffeeBrandOwner ? params.row.coffeeBrandOwner.address : "",
      },
      {
        field: "licenseNumber",
        headerName: "License Number",
        flex: 0.5,
        valueGetter: (params) => params.row.coffeeBrandOwner ? params.row.coffeeBrandOwner.address : "",
        },
    {
        field: "username",
        headerName: "Username",
        flex: 0.5,
    },
    
    {
        field: "role",
        headerName: "Role",
        valueGetter: (params) => params.row.role.name,

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

    
  return (
    <>
    <Box m="1.5rem 2.5rem">
        <Header title="User" subtitle="List of Users" />
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
    </Box>
    <EditCoffeeBrand
          user={selectedUser}
          openDialog={openDialog}
          onClose={handleDialogClose}
          handleEdit={handleUserFormSubmit}
        />
  </>
  )
}

export default Customer