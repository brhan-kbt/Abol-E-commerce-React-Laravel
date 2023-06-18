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
import { useStateContext } from '../../../contexts/ContextProvider';

export default function ProductForm({
  handleEdit,
  handleAdd,
  openDialog,
  onClose,
  product,
  errors
}) {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState('');
  const {currentUser}=useStateContext();
  const [formData, setFormData] = useState({
    productName: product?.productName || '',
    productType: product?.productType || '',
    productWeight: product?.productWeight || '',
    brand: product?.brand || '',
    user_id:currentUser.id,
    subscription_id:currentUser.coffee_brand_owner.subscription.id,
    photo: null,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  console.log('Subscription:',currentUser.coffee_brand_owner.subscription.id);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  useEffect(() => {
    setOpen(openDialog);
    console.log('dasddsdsa',product);
    if (product) {
      setFormData({
        productName: product.productName || '',
        productType: product.productType || '',
        productWeight: product.productWeight || '',
        brand: product.brand || '',
        price: product.price || '',
        user_id:product.user_id,
        subscription_id:currentUser.coffee_brand_owner.subscription.id,
        status:0,
        photo: null,
      });
      setId(product.id);
    }
  }, [product]);

  const handleSubscribe = () => {
    const updatedFormData = id ? { ...formData, id } : formData;

    if (product && product.id) {
      
      handleEdit(updatedFormData);
    } else {
      const formData = new FormData();
      formData.append('productName', updatedFormData.productName);
      formData.append('productType', updatedFormData.productType);
      formData.append('productWeight', updatedFormData.productWeight);
      formData.append('brand', updatedFormData.brand);
      formData.append('price', updatedFormData.price);
      formData.append('photo', updatedFormData.photo);
      formData.append('user_id', currentUser.id);
      formData.append('subscription_id', currentUser.coffee_brand_owner.subscription.id);
      formData.append('status', 0);

      console.log(currentUser.id);

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

  console.log('Errors',errors);

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
                sx={{ marginTop: '16px' }}
              />
              {errors.productName&&
                
                <small className='font-bold text-red-500' style={{marginTop:'-50px'}}>
                  {errors.productName}
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
               {errors.productWeight&&
                
                <small className='font-bold text-red-500' style={{marginTop:'-50px'}}>
                 { errors.productWeight}
                  </small>}

              <TextField
                id="price"
                label="Product Type"
                type="text"
                name="productType"
                value={formData.productType}
                onChange={handleFormChange}
                autoComplete="off"
                fullWidth
                required
                sx={{ marginTop: '16px' }}
              />
              {errors.productType&&
                <small className='font-bold text-red-500' style={{marginTop:'-50px'}}>
                 { errors.productType}
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
               {errors.price&&
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
               {errors.brand&&
                <small className='font-bold text-red-500' >
                 { errors.brand}
                  </small>}

              <div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                sx={{ marginTop: '40px' }}
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
