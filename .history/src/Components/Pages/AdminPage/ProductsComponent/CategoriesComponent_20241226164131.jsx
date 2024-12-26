import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  ImageField,
  ImageInput,
} from 'react-admin';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { Edit } from 'react-admin';
import { handleSave } from '../JS/fileUploadUtils';
import uploadsConfig from '../../../../uploadsConfig';

// Список всех категорий
export const CategoriesList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="title" label="Title" />\
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Создание категории
export const CategoriesCreate = (props) => (
  <Create {...props} transform={handleSave}>
    <SimpleForm>
      <TextInput source="title" label="Title" />
    </SimpleForm>
  </Create>
);

// Редактирование категории
export const CategoriesEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" label="Title" />
    </SimpleForm>
  </Edit>
);
