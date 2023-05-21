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

export default function RoleForm({
  handleEdit,
  handleAdd,
  openDialog,
  onClose,
  role,
}) {

  

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState('');
  const [formData, setFormData] = useState({
    name: role?.name || "",
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
    if (role) {
        setFormData({
            name: role.name || "",
        });
        setId(role.id);
    }
  },[role])

  const handleSubscribe = () => {
    const updatedFormData = id ? { ...formData, id } : formData; // Merge id with formData if editing

    if (role && role.id) {
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
          <DialogTitle>Role Form</DialogTitle>
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
          label="Role Name"
          type="text"
          value={formData.name}
          onChange={handleFormChange}
          name='name'
          autoComplete="name"
          />
         </div>
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


