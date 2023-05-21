import { Add, Delete, Edit } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosClient from '../axios';
import Header from '../Layout/Header'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditCustomer from './EditCustomer';
import RoleForm from './RoleForm';

const Role = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedUser, setSelectedUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleUserFormSubmit = (role) => {
        if (role.id) {
          // role has an ID, perform edit operation
          console.log("Edit role:", role);
           axiosClient.put(`/roles/${role.id}`, role)
             .then(response => {
               console.log(response)
             })
             .catch(error => {
               console.error(error);
             });
        } else {
          // role doesn't have an ID, perform add operation
          console.log("Add Role:", role);
           axiosClient.post('/roles', role)
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
          console.log("UPDATED id:", id);
          axiosClient
            .delete(`/roles/${id}`)
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
        axiosClient.get('/roles')
          .then(response => {
            const usersData= response.data.roles; 
            console.log('Role',usersData);
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
     field: "name",
     headerName: "Role Name",
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
        setSelectedUser({}); // Reset selectedUser to null
        console.log('clicked');
        setOpenDialog(true);

      };
    
  return (
    <>
    <Box m="1.5rem 2.5rem ">
        <div className='flex justify-between'>
        <Header title="Roles" subtitle="List of roles" />
        <Button sx={{ backgroundColor: "green",height:'40px', color:'white','&:hover': {
            backgroundColor: 'darkgreen',
            color: 'lightGrey',
            },}} className='flex gap-2' onClick={handleButtonClick}><Add/> Add Role</Button>
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
         <RoleForm
          role={selectedUser}
          openDialog={openDialog}
          onClose={handleDialogClose}
          handleEdit={handleUserFormSubmit}
          handleAdd={handleUserFormSubmit}
        />
    </Box>
  </>
  )
}

export default Role