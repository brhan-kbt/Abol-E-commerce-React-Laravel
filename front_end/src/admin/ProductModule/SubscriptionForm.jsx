import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';

export default function SubscriptionForm({
  handleEdit,
  handleAdd,
  openDialog,
  onClose,
  subscription,
}) {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState('');
  const [formData, setFormData] = useState({
    subscriptionName: subscription?.subscriptionName || '',
    subscriptionPrice: subscription?.subscriptionPrice || '',
    features: subscription?.features || [],
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
    if (subscription) {
      setFormData({
        subscriptionName: subscription.subscriptionName || '',
        subscriptionPrice: subscription.subscriptionPrice || '',
        features: subscription.features || [],
      });
      setId(subscription.id);
    }
  }, [subscription]);

  const handleSubscribe = () => {
    const updatedFormData = id ? { ...formData, id } : formData;

    if (subscription && subscription.id) {
      handleEdit(updatedFormData);
    } else {
      handleAdd(formData);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'features') {
      const features = value.split(','); // Split the comma-separated values into an array
      setFormData((prevState) => ({
        ...prevState,
        [name]: features,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
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
                id="subscriptionName"
                label="Subscription Name"
                type="text"
                name="subscriptionName"
                value={formData.subscriptionName}
                onChange={handleFormChange}
                autoComplete="off"
                fullWidth
                required
                sx={{ marginTop: '16px', marginBottom: '16px' }}
              />
              <TextField
                id="subscriptionPrice"
                label="Subscription Price"
                type="number"
                name="subscriptionPrice"
                value={formData.subscriptionPrice}
                onChange={handleFormChange}
                autoComplete="off"
                fullWidth
                required
                sx={{ marginBottom: '16px' }}
              />
              <TextField
                id="features"
                label="Subscription Features"
                type="text"
                name="features"
                value={formData.features.join(',')} // Join the array values with commas
                onChange={handleFormChange}
                autoComplete="off"
                fullWidth
                required
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
