import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../Layout/Header';

const MessageDetail = () => {
    const location = useLocation();
  const { message } = location.state;
  console.log(message);
  return (
    <>
     <Box m="1.5rem 2.5rem">
        <Header title="Message" subtitle="Detail of Message" />
        <Card>
            <CardHeader title="Message Detail" />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                <strong>Sender Name:</strong> {message.fullName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <strong>Sender Email:</strong> {message.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <strong>Sender Brand Name:</strong> {message.user.coffee_brand_owner.coffeeBrandName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <strong>Message:</strong> {message.message}
                </Typography>
            </CardContent>
        </Card>
    </Box>
    </>
  )
}

export default MessageDetail