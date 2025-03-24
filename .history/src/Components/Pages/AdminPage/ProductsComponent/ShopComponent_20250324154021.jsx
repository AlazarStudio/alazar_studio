import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  EditButton,
  DeleteButton,
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ImageInput,
  ImageField,
  ReferenceArrayInput,
  SelectArrayInput,
  Edit,
  FunctionField,
} from 'react-admin';
import { handleSave, handleSaveWithImages } from '../JS/fileUploadUtils';
import uploadsConfig from '../../../../uploadsConfig';

export const ShopList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Название" />
      <NumberField source="price" label="Цена" />
      <TextField source="website" label="Сайт" />
      <FunctionField
        label="Категории"
        render={(record) =>
          record.categories?.length
            ? record.categories.map((cat) => cat.title).join(', ')
            : 'Нет категорий'
        }
      />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ShopCreate = (props) => (
  <Create {...props} transform={handleSave}>
    <SimpleForm>
      <TextInput source="name" label="Название" />
      <NumberInput source="price" label="Цена" />
      <TextInput source="website" label="Сайт" />
      <ReferenceArrayInput
        source="categoryIds"
        reference="categories"
        label="Категории"
      >
        <SelectArrayInput optionText="title" />
      </ReferenceArrayInput>
      <ImageInput source="img" label="Изображения" multiple>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export const ShopEdit = (props) => (
  <Edit {...props} transform={handleSaveWithImages}>
    <SimpleForm>
      <TextInput source="name" label="Название" />
      <NumberInput source="price" label="Цена" />
      <TextInput source="website" label="Сайт" />
      <ReferenceArrayInput
        source="categoryIds"
        reference="categories"
        label="Категории"
      >
        <SelectArrayInput optionText="title" />
      </ReferenceArrayInput>
      <ImageInput
        source="imagesRaw"
        label="Загрузить новые изображения"
        multiple
        accept="image/*"
      >
        <ImageField source="src" title="title" />
      </ImageInput>
      <ImageInput
        source="img"
        label="Старые изображения"
        multiple
        accept="image/*"
        format={(value) =>
          Array.isArray(value)
            ? value.map((image) => ({
                src: image.includes('http')
                  ? image
                  : `${uploadsConfig}${image}`,
                title: image,
              }))
            : []
        }
        parse={(value) =>
          Array.isArray(value)
            ? value.map((file) =>
                file.rawFile
                  ? file.rawFile
                  : file.src.replace(`${uploadsConfig}`, '')
              )
            : []
        }
      >
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
