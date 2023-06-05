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
import { useStateContext } from '../../contexts/ContextProvider';
import { MenuItem } from '@mui/material';

export default function AdvertisementForm({
  handleEdit,
  handleAdd,
  openDialog,
  onClose,
  advert,
}) {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState('');
  const {currentUser}=useStateContext();
  const [formData, setFormData] = useState({
    advertisementBrand: advert?.advertisementBrand || '',
    advertisementOwner: advert?.advertisementOwner || '',
    advertisementType: advert?.advertisementType || '',
    user_id:currentUser.id,
    status: advert?.status,
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
    console.log('Au:',advert);
    if (advert) {
      setFormData({
        advertisementBrand:advert.advertisementBrand || '',
        advertisementOwner:advert.advertisementOwner || '',
        advertisementType:advert.advertisementType || '',
        user_id:advert.user_id,
        status:advert.status ,
        photo: null,
      });
      setId(advert.id);
    }
  }, [advert]);

  const handleSubscribe = () => {
    const updatedFormData = id ? { ...formData, id } : formData;

    if (advert &&advert.id) {
      
      handleEdit(updatedFormData);
    } else {
      const formData = new FormData();
      formData.append('advertisementBrand', updatedFormData.advertisementBrand);
      formData.append('advertisementOwner', updatedFormData.advertisementOwner);
      formData.append('advertisementType', updatedFormData.advertisementType);
      formData.append('photo', updatedFormData.photo);
      formData.append('status', updatedFormData.status || 0);
      formData.append('user_id', currentUser.id);
      formData.append('status', 0);

      console.log(currentUser.id);

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
            Add Advert
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
                id="advertisementBrand"
                label="Advert Brand"
                type="text"
                name="advertisementBrand"
                value={formData.advertisementBrand}
                onChange={handleFormChange}
                autoComplete="off"
                fullWidth
                required
                sx={{ marginTop: '16px', marginBottom: '16px' }}
              />
             
              <TextField
                id="advertisementType"
                label="Advert Type"
                type="text"
                name="advertisementType"
                value={formData.advertisementType}
                onChange={handleFormChange}
                autoComplete="off"
                fullWidth
                required
                sx={{ marginBottom: '16px' }}
              />

              <TextField
                id="price"
                label="Advert Owner"
                type="text"
                name="advertisementOwner"
                value={formData.advertisementOwner}
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
