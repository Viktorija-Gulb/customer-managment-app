import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import { User } from '../Types';

const useStyles = makeStyles((theme) => ({
  actionBtns: {
    display: 'flex',
  },
}));

interface Props {
  customers: User[];
  tableHeader: string[];
  requestError: boolean;
  handleEdit: (row: User) => void;
  handleDelete: (id: number) => void;
}

const CustomerTable: React.FC<Props> = ({
  customers,
  tableHeader,
  requestError,
  handleEdit,
  handleDelete,
}: Props) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeader.map((item) => (
              <TableCell key={item}>{item}</TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell component="th" scope="row">
                {customer.fullName}
              </TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.city}</TableCell>
              <TableCell>{customer.street}</TableCell>
              <TableCell>{customer.houseNumber}</TableCell>
              <TableCell>{customer.zipCode}</TableCell>
              <TableCell>{requestError ? 'Error' : customer.latitude}</TableCell>
              <TableCell>{requestError ? 'Error' : customer.longitude}</TableCell>
              <TableCell>
                <div className={classes.actionBtns}>
                  <EditIcon onClick={() => handleEdit(customer)} />
                  <ClearIcon onClick={() => handleDelete(customer.id)} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTable;
