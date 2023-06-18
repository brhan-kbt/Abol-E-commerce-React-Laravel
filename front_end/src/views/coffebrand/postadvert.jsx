import { Add, Delete, Edit } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axiosClient from '../../axios';
import Header from '../../Layout/Header';
import ProductForm from './forms/productForm';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useStateContext } from '../../contexts/ContextProvider';
import AdvertForm from './forms/advertForm';
import { Navigate } from 'react-router-dom';

const Advert = () => {
    const [advert, setAdvert] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {currentUser,userToken}=useStateContext();
    const [errors,setErrors]=useState({});

    const [selectedAdvert, setSelectedAdvert] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

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


    const handleAdvertFormSubmit = (advert) => {
        if (advert.id) {
          // advert has an ID, perform edit operation
          console.log(" Edit advert:", advert);
           axiosClient.put(`/adverts/${advert.id}`, advert)
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
               console.error(error);
             });
        } else {
          // advert doesn't have an ID, perform add operation
          console.log("Add Advert:", advert);
            axiosClient.post('/adverts', advert)
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
                 console.error(error);
              });
        }
      }
      

      const deleteRow = (id) => {
        // Display a confirmation dialog
        if (window.confirm("Are you sure you want to delete this advert?")) {
          console.log("Deleted id:", id);
          axiosClient
            .delete(`/adverts/${id}`)
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
      
      const fetchData = () => {
        setIsLoading(true); // Show loading state
        axiosClient.get(`/adverts/user/${currentUser.id}`)
        .then(response => {
          const advertData= response.data.data; 
          console.log('AdvertsOfUser:',advertData);
          setAdvert(advertData);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          setIsLoading(false)
        });
      };
  
      useEffect(()=>{
        axiosClient.get(`/adverts/user/${currentUser.id}`)
          .then(response => {
            const advertData= response.data.data; 
            console.log('AdvertsOfUser:',advertData);
            setAdvert(advertData);
            setIsLoading(false);
          })
          .catch(error => {
            console.error(error);
            setIsLoading(false)
          });
      },[])

      const handleEdit = (advert) => {
        setSelectedAdvert(advert);
        setOpenDialog(true);
      };
    
      useEffect(() => {
        // handleEdit(selectedAdvert);
      }, [selectedAdvert]);
    
      const handleDialogClose = () => {
        setSelectedAdvert(null);
        setOpenDialog(false);
      };

    const columns = [
    {
        field: "id",
        headerName: "ID",
        flex: 0.1,
    },
     {
     field: "advertisementBrand",
     headerName: "Advertisement Brand",
     flex: 0.5,
     },
     {
      field: "photo",
      headerName: "Advertisement Photo",
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
        field: "advertisementType",
        headerName: "advertisement Type",
        flex: 0.5,
    },
    {
        field: "advertisementOwner",
        headerName: "Advertisement Owner",
        flex: 0.5,
    }, 
        
    {
      field: "status",
      headerName: "Status",
      flex: 0.3,
      renderCell: (params) => {
        const statusValue = params.row.status;
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
        setSelectedAdvert({}); // Reset selectedAdvert to null
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
            },}} className='flex gap-2' onClick={handleButtonClick}><Add/> Add Advert</Button>
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
              rows={advert}
              columns={columns}
            />
        )}
         <AdvertForm
          advert={selectedAdvert}
          openDialog={openDialog}
          onClose={handleDialogClose}
          handleEdit={handleAdvertFormSubmit}
          handleAdd={handleAdvertFormSubmit}
          errors={errors}
        />
    </Box>
    <Footer/>
  </>
  )
}

export default Advert