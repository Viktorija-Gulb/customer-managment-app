import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { API_KEY, BASE_URL } from '../api/constants';
import CustomerTable from '../components/CustomerTable';
import FormDialog from '../components/FormDialog';
import { useStickyState } from '../hooks/useStickyState';
import { User } from '../Types';

const initialState = {
  id: 0,
  fullName: '',
  email: '',
  city: '',
  street: '',
  houseNumber: '',
  zipCode: '',
  latitude: undefined,
  longitude: undefined,
};

const CustomerRegistration = () => {
  const [requestError, setRequestError] = useState(false);

  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useStickyState([], 'data');

  const [user, setUser] = useState<User>(initialState);

  const existedUser = customers.some((x: User) => x.id === user.id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    existedUser
      ? setUser({
          ...user,
          id: user.id,
          [name]: value,
        })
      : setUser({
          ...user,
          id: Math.floor(Math.random() * 10000),
          [name]: value,
        });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function geocode() {
    axios
      .get(BASE_URL, {
        params: {
          address: `${user.houseNumber} ${user.street} ${user.city}`,
          key: API_KEY,
        },
      })
      .then((response) => {
        const coordinates = response.data.results[0]?.geometry.location;
        existedUser
          ? setCustomers(
              customers.map((x: User) =>
                x.id === user.id
                  ? {
                      ...user,
                      id: x.id,
                      latitude: coordinates.lat,
                      longitude: coordinates.lng,
                    }
                  : x
              )
            )
          : setCustomers([
              ...customers,
              { ...user, latitude: coordinates.lat, longitude: coordinates.lng },
            ]);
      })
      .catch((error) => {
        setRequestError(true);
        setCustomers([...customers, user]);
      });
  }

  const handleSubmit = () => {
    setOpen(false);
    geocode();
    setUser(initialState);
  };

  const handleEdit = (userData: User) => {
    setOpen(true);
    setUser(userData);
  };

  const handleDelete = (id: number) => {
    setCustomers(customers.filter((x: User) => x.id !== id));
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} data-test="dialog-btn">
        Register new customer
      </Button>
      <div data-test="form-dialog">
        <FormDialog
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          user={user}
        />
      </div>

      <h3>Registered customers</h3>
      <div data-test="customer-table-wrapper">
        <CustomerTable
          customers={customers}
          requestError={requestError}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default CustomerRegistration;
