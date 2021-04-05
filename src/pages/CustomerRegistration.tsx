import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustomerTable from '../components/CustomerTable';
import FormDialog from '../components/FormDialog';
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
  // const API_KEY = AIzaSyDX7YZkeMbs5twh3w2ishorXao0fWnT3zY
  const geolocation = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,
  +Mountain+View,+CA&key=AIzaSyBQMdwglpSVgVP-f332VhaTg43Mket4sf0`;

  const [requestError, setRequestError] = useState(false);

  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState<User[]>([]);

  const [user, setUser] = useState<User>(initialState);

  useEffect(() => {
    const dataFromStorage = localStorage.getItem('data');
    if (dataFromStorage) {
      setCustomers(JSON.parse(dataFromStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(customers));
  });

  const matched = customers.find((x) => x.id === user.id);
  console.log('user ', user, !!matched);

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
      .get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: `${user.houseNumber} ${user.street} ${user.city}`,
          key: 'AIzaSyBQMdwglpSVgVP-f332VhaTg43Mket4sf0',
        },
      })
      .then((response) => {
        const coordinates = response.data.results[0]?.geometry.location;
        // if (coordinates) {
        //   setCustomers([
        //     ...customers,
        //     {
        //       ...user,
        //       latitude: coordinates.lat,
        //       longitude: coordinates.lng,
        //     },
        //   ]);
        // }
        if (coordinates) {
          matched
            ? setCustomers(
                customers.map((x) =>
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
        console.log('error', error);
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
    setCustomers(customers.filter((x) => x.id !== id));
  };

  console.log('change user', user);
  console.log('customers ', customers);

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
