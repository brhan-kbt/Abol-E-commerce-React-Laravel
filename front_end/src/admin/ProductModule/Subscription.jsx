import { Add, Delete, Edit } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import axiosClient from '../../axios';
import Header from '../../Layout/Header';
import SubscriptionForm from './SubscriptionForm';

const Subscription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [errors,setErrors]=useState({});
  const [subscriptions,setSubscriptions]=useState('');


  const handleSubscriptionFormSubmit = (subscription) => {
    if (subscription.id) {
      // subscription has an ID, perform edit operation
      console.log("Edit Subscription:", subscription);
      axiosClient
        .put(`/subscriptions/${subscription.id}`, subscription)
        .then(response => {
          console.log(response);
          handleDialogClose();
          axiosClient
          .get(`/subscriptions/`)
          .then(response => {
            console.log('Subscripton:',response.data);
            // Handle successful deletion
            setSubscriptions(response.data);
            setIsLoading(false);
          })
          .catch(error => {
            // Handle errors
            console.error(error);
            setIsLoading(false);

          });
        })
        .catch(error => {
          if (error && error.response && error.response.data) {
            setErrors(error.response.data.errors);
            console.log(error.response.data.errors);
          }
          console.error(error);
          });
    } else {
      // subscription doesn't have an ID, perform add operation
      console.log("Add Subscription:", subscription);
      axiosClient
        .post('/subscriptions', subscription)
        .then(response => {
          console.log(response);
          handleDialogClose();
          axiosClient
          .get(`/subscriptions/`)
          .then(response => {
            console.log('Subscripton:',response.data);
            // Handle successful deletion
            setIsLoading(false);

            setSubscriptions(response.data);
          })
          .catch(error => {
            // Handle errors
            console.error(error);
            setIsLoading(false);

          });
        })
        .catch(error => {
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
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      console.log("Deleted id:", id);
      axiosClient
        .delete(`/subscriptions/${id}`)
        .then(response => {
          console.log(response);
          // Handle successful deletion
        })
        .catch(error => {
          // Handle errors
          console.error(error);
        });
    }
  };



  useEffect(() => {
    axiosClient
    .get(`/subscriptions/`)
    .then(response => {
      console.log('Subscripton:',response.data);
      // Handle successful deletion
      setSubscriptions(response.data);
    })
    .catch(error => {
      // Handle errors
      console.error(error);
    });
  }, [])
  

  const handleEdit = (subscription) => {
    setSelectedSubscription(subscription);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setSelectedSubscription(null);
    setOpenDialog(false);
  };

 
  // const subscriptions = [
  //   {
  //     id: 1,
  //     subscriptionName: 'Basic',
  //     subscriptionPrice: 10000,
  //     features: ['Post 10', 'Post1']
  //   },
  //   {
  //     id: 2,
  //     subscriptionName: 'Standard',
  //     subscriptionPrice: 20000,
  //     features: ['Post 15', 'Post1']
  //   },
  //   {
  //     id: 3,
  //     subscriptionName: 'Premium',
  //     subscriptionPrice: 30000,
  //     features: ['Post 15', 'Post1']
  //   }
  // ];

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.1,
    },
    {
      field: "subscriptionName",
      headerName: "Subscription Name",
      flex: 0.5,
    },
    {
      field: "subscriptionPrice",
      headerName: "Subscription Price",
      flex: 0.5,
    },
    {
      field: "product_limit",
      headerName: "Product Limit",
      flex: 0.5,
    },
    {
      field: "features",
      headerName: "Subscription Features",
      flex: 0.5,
      renderCell: (params) => {
        let features = [];
        try {
          features = JSON.parse(params.value);
        } catch (error) {
          console.error("Error parsing features:", error);
        }
        return features.map((feature, index) => (
          <div key={index}>{feature}</div>
        ));
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      renderCell: (params) => (
        <Box>
          <IconButton sx={{ color: "green" }} onClick={() => handleEdit(params.row)}>
            <Edit />
          </IconButton>
          <IconButton sx={{ color: "red" }} onClick={() => deleteRow(params.row.id)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleButtonClick = () => {
    setSelectedSubscription({}); // Reset selectedSubscription to null
    setOpenDialog(true);
    console.log('clicked');
  };

  return (
    <>
      <Box m="1.5rem 2.5rem ">
        <div className='flex justify-between'>
          <Header title="Subscription Plans" subtitle="List of Subscription" />
          <Button
            sx={{
              backgroundColor: "green",
              height: '40px',
              color: 'white',
              '&:hover': {
                backgroundColor: 'darkgreen',
                color: 'lightGrey',
              },
            }}
            className='flex gap-2'
            onClick={handleButtonClick}
          >
            <Add /> Add Subscription
          </Button>
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
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <DataGrid
            getRowId={(row) => row.id}
            rows={subscriptions}
            columns={columns}
          />
        </Box>
        <SubscriptionForm
          subscription={selectedSubscription}
          openDialog={openDialog}
          onClose={handleDialogClose}
          handleEdit={handleSubscriptionFormSubmit}
          handleAdd={handleSubscriptionFormSubmit}
          errors={errors}
        />
      </Box>
    </>
  );
}

export default Subscription;
