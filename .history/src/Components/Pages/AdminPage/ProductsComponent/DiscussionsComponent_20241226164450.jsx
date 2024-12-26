import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const DiscussionsList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <TextField source="phone" label="Phone" />
      <TextField source="email" label="E-mail" />
      <TextField source="company" label="Company" />
      <TextField source="budget" label="Budget" />
      <TextField source="message" label="Message" />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Создание категории
export const DiscussionsCreate = (props) => (
  <Create {...props} transform={handleSave}>
    <SimpleForm>
      <TextInput source="name" label="Title" />
      <TextInput source="title" label="Title" />
      <TextInput source="title" label="Title" />
      <TextInput source="title" label="Title" />
      <TextInput source="title" label="Title" />
      <TextInput source="title" label="Title" />
    </SimpleForm>
  </Create>
);

// Редактирование категории
export const DiscussionsEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" label="Title" />
    </SimpleForm>
  </Edit>
);
