import { Add, Delete, Edit } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosClient from '../axios';
import Header from '../Layout/Header'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditCustomer from './EditCustomer';
import { useNavigate } from 'react-router-dom';

const Messages = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate=useNavigate();
  const deleteRow = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      axiosClient
        .delete(`/contacts/${id}`)
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
    axiosClient.get('/contacts')
      .then(response => {
        const usersData = response.data.data;
        console.log('Role', usersData);
        setUsers(usersData);
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
      field: "fullName",
      headerName: "Sender Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Sender Email",
      flex: 0.5,
    },
    {
      field: "message",
      headerName: "Sender Message",
      flex: 0.5,
      valueGetter: (params) => {
        const message = params.row.message;
        if (message.length > 20) {
          return `${message.slice(0, 20)}...`;
        }
        return message;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Box>
            <IconButton sx={{ color: "red" }} onClick={() => deleteRow(params.row.id)}>
              <Delete />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const handleRowClick = (params) => {
    console.log(params.row);
    const message=params.row;
    navigate(`/messages/detail`, { state: { message } });

  }

  return (
    <>
      <Box m="1.5rem 2.5rem ">
        <div className='flex justify-between'>
          <Header title="Messages" subtitle="List of messages" />
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
            borderBottom: 2,
            color: 'black',
            borderColor: "red",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: 'lightGrey',
            color: 'black',
            fontWeight: 'bold',
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: '',
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: 'lightGrey',
            color: 'black',
            fontWeight: 'bold'
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            borderColor: 'black'
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
              onRowClick={handleRowClick}
            />
          </Box>
        )}
      </Box>
    </>
  )
}

export default Messages;
