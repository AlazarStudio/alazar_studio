import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const FeedbacksList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <TextField source="phone" label="Phone" />
      <TextField source="userId" label="User ID" />
      <TextField source="userId" label="User ID" />
      <TextField source="userId" label="User ID" />
      

      <DeleteButton />
    </Datagrid>
  </List>
);
