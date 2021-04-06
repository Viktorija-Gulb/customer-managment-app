import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { API_KEY, BASE_URL } from '../api/constants';
import CustomerTable from '../components/CustomerTable';
import FormDialog from '../components/FormDialog';
import { useStickyState } from '../hooks/useStickyState';
import { User } from '../Types';

const tableHeader = [
  'Full name',
  'Email',
  'City',
  'Street',
  'House number',
  'Zip code',
  'Latitude',
  'Longtitute',
];

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    user.id !== 0
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
        if (coordinates) {
          user.id !== 0
            ? setCustomers(
                customers.map((x: User) =>
                  x.id === user.id
                    ? {
                        ...x,
                        id: x.id,
                        fullName: user.fullName,
                        email: user.email,
                        city: user.city,
                        street: user.street,
                        houseNumber: user.houseNumber,
                        zipCode: user.zipCode,
                        latitude: coordinates.lat,
                        longitude: coordinates.lng,
                      }
                    : x
                )
              )
            : setCustomers([
                ...customers,
                {
                  ...user,
                  latitude: coordinates.lat,
                  longitude: coordinates.lng,
                },
              ]);
        }
      })
      .catch((error) => {
        setRequestError(true);
        setCustomers([...customers, user]);
      });
  }

  const handleSubmit = (e: any) => {
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
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Register new customer
      </Button>
      <FormDialog
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        user={user}
      />

      <h3>Registered customers</h3>
      <CustomerTable
        customers={customers}
        tableHeader={tableHeader}
        requestError={requestError}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default CustomerRegistration;
