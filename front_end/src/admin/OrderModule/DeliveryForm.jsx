import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useEffect } from 'react';

export default function DeliveryForm({
  handleEdit,
  handleAdd,
  openDialog,
  onClose,
  delivery,
}) {

  

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState('');
  const [formData, setFormData] = useState({
    name: delivery?.name || "",
    address: delivery?.address || "",
  });
  
 
 const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClose(); // Call the onClose function provided as a prop
  };

  useEffect(()=>{
    setOpen(openDialog);
    if (delivery) {
        setFormData({
            name: delivery.name || "",
            address: delivery.address || "",
        });
        setId(delivery.id);
    }
  },[delivery])

  const handleSubscribe = () => {
    const updatedFormData = id ? { ...formData, id } : formData; // Merge id with formData if editing

    if (delivery && delivery.id) {
      handleEdit(updatedFormData); // Call the handleEdit function for editing
    } else {
      handleAdd(formData); // Call the handleAdd function for adding
    }
  };
  

  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 
 
  
  return (


    <div>
      <form onSubmit={handleSubscribe}>
        <Dialog open={open} onClose={handleClose} 
        
        >
          <DialogTitle>delivery Form</DialogTitle>
          <DialogContent>
          <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%', maxWidth:'70' },
        }}
        noValidate
        autoComplete="off"
      >
          <div className='flex flex-col md:flex-row w-[100%]'>
          <TextField
          id="name"
          label="Delivery Name"
          type="text"
          value={formData.name}
          onChange={handleFormChange}
          name='name'
          autoComplete="name"
          />
         </div>
          <TextField
          id="address"
          label="Delivery Address"
          type="text"
          value={formData.address}
          onChange={handleFormChange}
          name='address'
          autoComplete="address"
          />
      </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined"  sx={{borderColor:'red', color:'red'}} onClick={handleClose}>Cancel</Button>
            <Button variant="outlined" sx={{borderColor:'orange', color:'orange'}} onClick={handleSubscribe}>Save</Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}


