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

export default function AdvertForm({
  handleEdit,
  handleAdd,
  openDialog,
  onClose,
  role,
}) {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState('');
  const [formData, setFormData] = useState({
    productName: role?.productName || '',
    productType: role?.productType || '',
    productWeight: role?.productWeight || '',
    brand: role?.brand || '',
    photo: null,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  useEffect(() => {
    setOpen(openDialog);
    if (role) {
      setFormData({
        productName: role.productName || '',
        productType: role.productType || '',
        productWeight: role.productWeight || '',
        brand: role.brand || '',
        price: role.price || '',
        photo: null,
      });
      setId(role.id);
    }
  }, [role]);

  const handleSubscribe = () => {
    const updatedFormData = id ? { ...formData, id } : formData;

    if (role && role.id) {
      
      handleEdit(updatedFormData);
    } else {
      const formData = new FormData();
      formData.append('productName', updatedFormData.productName);
      formData.append('productType', updatedFormData.productType);
      formData.append('productWeight', updatedFormData.productWeight);
      formData.append('brand', updatedFormData.brand);
      formData.append('price', updatedFormData.price);
      formData.append('photo', updatedFormData.photo);

      handleAdd(formData);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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
                id="productName"
                label="Product Name"
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleFormChange}
                autoComplete="off"
                fullWidth
                required
                sx={{ marginTop: '16px', marginBottom: '16px' }}
              />
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
                sx={{ marginBottom: '16px' }}
              />
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
                sx={{ marginBottom: '16px' }}
              />

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
                sx={{ marginBottom: '16px' }}
              />

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
                sx={{ marginBottom: '16px' }}
              />

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                sx={{ marginBottom: '16px' }}
              />
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
