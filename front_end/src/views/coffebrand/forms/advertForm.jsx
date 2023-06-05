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

export default function AdvertForm({
  handleEdit,
  handleAdd,
  openDialog,
  onClose,
  advert,
  errors
}) {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState('');
  const {currentUser}=useStateContext();
  const [formData, setFormData] = useState({
    advertisementBrand: advert?.advertisementBrand || '',
    advertisementOwner: advert?.advertisementOwner || '',
    advertisementType: advert?.advertisementType || '',
    user_id:currentUser.id,
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
        status:0,
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
      formData.append('user_id', currentUser.id);
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

  console.log(errors);

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
                id="advertisementBrand"
                label="Advert Brand"
                type="text"
                name="advertisementBrand"
                value={formData.advertisementBrand}
                onChange={handleFormChange}
                autoComplete="off"
                fullWidth
                required
                sx={{ marginTop: '16px' }}
              />
              {errors.advertisementBrand&&
                
                <small className='font-bold text-red-500' style={{marginTop:'-50px'}}>
                  {errors.advertisementBrand}
                  </small>}
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
                sx={{ marginTop: '16px' }}
              />
                {errors.advertisementType&&
                
                <small className='font-bold text-red-500' style={{marginTop:'-50px'}}>
                  {errors.advertisementType}
                  </small>}
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
                sx={{ marginTop: '16px' }}
              />

            {errors.advertisementOwner&&
                
                <small className='font-bold text-red-500' style={{marginTop:'-50px'}}>
                  {errors.advertisementOwner}
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
