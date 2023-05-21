import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Box, Select, FormControl, InputLabel } from '@mui/material';
import axiosClient from '../axios';

export default function EditUser({ handleEdit, handleAdd, openDialog, onClose, user }) {
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState('');

  const [formData, setFormData] = useState({
    id: user?.id || '',
    username: user?.username || '',
    coffeeBrandName: user?.coffeeBrandOwner?.coffeeBrandName || '',
    address: user?.coffeeBrandOwner?.address || '',
    licenseNumber: user?.coffeeBrandOwner?.licenseNumber || '',
    role_id: user?.role?.id || '',

  });

  useEffect(() => {

    axiosClient.get('/roles')
      .then(response => {
        setRoles(response.data.roles);
        console.log(response.data.roles);
      })
      .catch(error => {
        console.error(error);
      });

    setOpen(openDialog);
    if (user) {
      setFormData({
        id: user.id || '',
        username: user.username || '',
        coffeeBrandName: user.coffeeBrandOwner.coffeeBrandName || '',
        address: user.coffeeBrandOwner.address || '',
        licenseNumber: user.coffeeBrandOwner.licenseNumber || '',
        role_id: user.role.id || '',
      });
    }
  }, [openDialog, user]);
 
  const handleSubscribe = (e) => {
    e.preventDefault(); // Prevent form submission
    handleEdit(formData); // Pass formData to handleEdit function
  };
  

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <div>
      {/* <Button variant="outlined" sx={{ backgroundColor: 'orange' }} onClick={() => setOpen(true)}>
        Add User
      </Button> */}
      <form onSubmit={handleSubscribe}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className='flex  justify-center font-bold'>Edit Coffee Brand</DialogTitle>
          <DialogContent sx={{ padding: '16px' }}>
          <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>

            <TextField
              id="username"
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              autoComplete="off"
              fullWidth
              required
              sx={{ marginTop: '16px',marginBottom:'16px' }}
            />
            <TextField
              id="coffeeBrandName"
              label="Coffee Brand Name"
              type="text"
              name="coffeeBrandName"
              value={formData.coffeeBrandName}
              onChange={handleFormChange}
              autoComplete="off"
              fullWidth
              required
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              id="address"
              label="Address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleFormChange}
              autoComplete="off"
              fullWidth
              required
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              id="licenseNumber"
              label="License Number"
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleFormChange}
              autoComplete="off"
              fullWidth
              required
              sx={{ marginBottom: '16px' }}
            />
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
                id="role_id"
                label="Role"
                name="role_id"
                value={formData.role_id}
                onChange={handleFormChange}
                fullWidth
                disabled
                required
                >
                {Array.isArray(roles) && roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                        {role.name}
                    </MenuItem>
                    ))}

                </Select>

          
            </FormControl>
            
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubscribe} type="submit">Save</Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
