import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin';

// Список разработчиков
export const DeveloperList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Имя" />
      <TextField source="position" label="Должность" />
      <TextField source="telegram" label="Telegram" />
      <TextField source="instagram" label="Instagram" />
      <TextField source="whatsapp" label="Whatsapp" />
      <TextField source="vk" label="VK" />
      <TextField source="tiktok" label="Tiktok" />
      <TextField source="behance" label="Behance" />
      <TextField source="pinterest" label="Pinterest" />
      <TextField source="artstation" label="Artstation" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
