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
import { MenuItem } from '@mui/material';
import { useStateContext } from '../../contexts/ContextProvider';

export default function CoffeeForm({
  handleEdit,
  handleAdd,
  openDialog,
  onClose,
  role,
  errors
}) {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState('');
  const {currentUser}=useStateContext();
  
  const [formData, setFormData] = useState({
    productName: role?.productName || '',
    productType: role?.productType || '',
    productWeight: role?.productWeight || '',
    brand: role?.brand || '',
    photo: null,
    user_id:currentUser.id,
    status: role?.status || 0, // Add status field with default value 0

  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  console.log('Errors',errors);

  useEffect(() => {
    setOpen(openDialog);
    if (role) {
      setFormData({
        productName: role.productName || '',
        productType: role.productType || '',
        productWeight: role.productWeight || '',
        brand: role.brand || '',
        price: role.price || '',
        user_id:role.user_id,
        status:role.status,
        photo: null,
      });
      setId(role.id);
    }
  }, [role]);

  const handleSubscribe = () => {
    const updatedFormData = id ? { ...formData, id } : formData;

    if (role && role.id) {
      handleEdit(updatedFormData);
      console.log(updatedFormData);
    } else {
      const formData = new FormData();
      console.log(formData);
      formData.append('productName', updatedFormData.productName);
      formData.append('productType', updatedFormData.productType);
      formData.append('productWeight', updatedFormData.productWeight);
      formData.append('brand', updatedFormData.brand);
      formData.append('price', updatedFormData.price);
      formData.append('photo', updatedFormData.photo);
      formData.append('user_id', currentUser.id);
      formData.append('status', updatedFormData.status || 0); // Append the status field to the FormData

      handleAdd(formData);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
  
    let updatedValue = value;
    if (name === 'status') {
      updatedValue = parseInt(value); // Convert the value to an integer
    }
    console.log(updatedValue);
    setFormData((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      photo: file,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubscribe}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className="flex justify-center font-bold">
            Add Product
          </DialogTitle>
          <DialogContent sx={{ padding: '16px' }}>
            <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
            <TextField
            id="status"
            label="Status"
            select
            name="status"
            value={formData.status}
            onChange={handleFormChange}
            autoComplete="off"
            fullWidth
            required
            sx={{ marginTop: '16px' }}
          >
            <MenuItem value={0}>Pending</MenuItem>
            <MenuItem value={1}>Activate</MenuItem>
          </TextField>
              <TextField
                id="productName"
                label="Product Name"
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleFormChange}
                autoComplete="off"
                fullWidth
                required
                sx={{ marginTop: '16px' }}
              />
               {errors&&errors.productName&&
                
                <small className='font-bold text-red-500' style={{marginTop:'-50px'}}>
                  {errors.productName}
                  </small>}
              <TextField
                id="productType"
                label="Coffee Brand Name"
                type="text"
                name="productType"
                value={formData.productType}
                onChange={handleFormChange}
                autoComplete="off"
                fullWidth
                required
                sx={{ marginTop: '16px' }}
              />
               {errors&&errors.productType&&
                
                <small className='font-bold text-red-500' style={{marginTop:'-50px'}}>
                 { errors.productType}
                  </small>}
              <TextField
                id="productWeight"
                label="Product Weight"
                type="text"
                name="productWeight"
                value={formData.productWeight}
                onChange={handleFormChange}
                autoComplete="off"
                fullWidth
                required
                sx={{ marginTop: '16px' }}
              />
              {errors&&errors.productWeight&&
                <small className='font-bold text-red-500' style={{marginTop:'-50px'}}>
                 { errors.productWeight}
                  </small>}

              <TextField
                id="price"
                label="Product Price"
                type="text"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
                autoComplete="off"
                fullWidth
                required
                sx={{ marginTop: '16px' }}
              />
            {errors&&errors.price&&
                <small className='font-bold text-red-500' style={{marginTop:'-50px'}}>
                  {errors.price}
                  </small>}
              <TextField
                id="brand"
                label="Product Brand"
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleFormChange}
                autoComplete="off"
                fullWidth
                required
                sx={{ marginTop: '16px' }}
              />
              {errors&&errors.brand&&
                <small className='font-bold text-red-500' style={{marginTop:'-50px'}}>
                 { errors.brand}
                  </small>}

              <div style={{marginTop:'16px'}}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  sx={{ marginTop: '16px' }}
                />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              sx={{ borderColor: 'red', color: 'red' }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              sx={{ borderColor: 'orange', color: 'orange' }}
              onClick={handleSubscribe}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
