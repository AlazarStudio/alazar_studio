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




// Создание разработчика
export const DeveloperCreate = (props) => (
  <Create {...props} transform={handleSave}>
    <SimpleForm>
      <TextInput source="name" label="Имя" />
      <TextInput source="position" label="Должность" />
      <TextInput source="telegram" label="Telegram" />
      <TextInput source="instagram" label="Instagram" />
      <TextInput source="whatsapp" label="Whatsapp" />
      <TextInput source="vk" label="VK" />
      <TextInput source="tiktok" label="Tiktok" />
      <TextInput source="behance" label="Behance" />
      <TextInput source="pinterest" label="Pinterest" />
      <TextInput source="artstation" label="Artstation" />
      <ImageInput source="img" label="Загрузить изображение" multiple>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);
