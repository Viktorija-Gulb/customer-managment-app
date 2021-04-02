import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import FormDialog from '../components/FormDialog';

const CustomerRegistration = () => {
  // const API_KEY = AIzaSyDX7YZkeMbs5twh3w2ishorXao0fWnT3zY
  const geolocation = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,
  +Mountain+View,+CA&key=AIzaSyBQMdwglpSVgVP-f332VhaTg43Mket4sf0`;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <FormDialog open={open} handleClose={handleClose} />
      <h3>container</h3>
    </div>
  );
};

export default CustomerRegistration;
