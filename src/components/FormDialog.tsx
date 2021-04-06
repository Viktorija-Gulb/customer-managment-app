import React, { ChangeEvent } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import { User } from '../Types';

const useStyles = makeStyles((theme: Theme) => ({
  formContent: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

interface Props {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (e: React.MouseEvent<HTMLElement>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  user: User;
}

const FormDialog: React.FC<Props> = ({
  open,
  handleClose,
  handleSubmit,
  handleChange,
  user,
}: Props) => {
  const classes = useStyles();
  const { fullName, email, city, street, houseNumber, zipCode } = user;

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add customer</DialogTitle>
      <DialogContent className={classes.formContent}>
        <FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
            type="name"
            name="fullName"
            fullWidth
            onChange={handleChange}
            value={fullName}
          />
        </FormControl>
        <FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            name="email"
            fullWidth
            value={email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="city"
            label="City"
            type="city"
            name="city"
            fullWidth
            value={city}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="street"
            label="Street"
            type="street"
            name="street"
            fullWidth
            value={street}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="house-number"
            label="House number"
            type="houseNumber"
            name="houseNumber"
            fullWidth
            value={houseNumber}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="zip-code"
            label="Zip code"
            type="zip-code"
            name="zipCode"
            fullWidth
            value={zipCode}
            onChange={handleChange}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
