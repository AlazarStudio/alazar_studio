import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  EditButton,
  DeleteButton,
  SelectInput,
  FileInput,
  FileField,
  SimpleFormIterator,
  ImageInput,
  ImageField,
} from 'react-admin';
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  useGetList,
} from 'react-admin';
import { Edit } from 'react-admin';
import { handleSave, handleSaveWithImages } from '../JS/fileUploadUtils';
import uploadsConfig from '../../../../uploadsConfig';

// Компонент для выбора категории
const CategorySelectInput = ({ source, label }) => {
  const { data, isLoading, error } = useGetList('categories', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'title', order: 'ASC' },
  });

  if (isLoading) {
    return <SelectInput source={source} label={label} choices={[]} disabled />;
  }

  if (error) {
    console.error('Ошибка загрузки категорий:', error);
    return null;
  }

  const choices = data.map((category) => ({
    id: category.id,
    name: category.title,
  }));

  return <SelectInput source={source} label={label} choices={choices} />;
};

// Компонент для выбора подкатегории


// Список продуктов
export const ProductsList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Название" />
      <TextField source="organization" label="Организыция" />
      <TextField source="description" label="Описание" />
      <TextField source="tags" label="Теги" />
      <NumberField source="price" label="Price" />
      <FileField source="img" label="Images" title="Image" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Создание продукта
export const ProductsCreate = (props) => (
  <Create {...props} transform={handleSave}>
    <SimpleForm>
      <TextInput source="name" label="Название" />
      <NumberInput source="price" label="Цена" />
      <ImageInput source="img" label="Загрузить изображения" multiple>
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput source="description" label="Описание" />
      <TextField source="organization" label="Организыция" />
    </SimpleForm>
  </Create>
);

// Редактирование продукта
export const ProductsEdit = (props) => (
  <Edit {...props} transform={handleSaveWithImages}>
    <SimpleForm>
      <TextInput source="name" label="Name" />
      <NumberInput source="price" label="Price" />
      <ImageInput
        source="imagesRaw"
        label="Загрузить новые изображения"
        multiple
        accept="image/*"
      >
        <ImageField source="src" title="title" />
      </ImageInput>
      {/* Поле для отображения старых изображений, если они есть */}
      <ImageInput
        source="img"
        label="Старые изображения"
        multiple
        accept="image/*"
        format={(value) =>
          value && value.length
            ? value.map((image) => ({
                src: image.includes('http')
                  ? image
                  : `${uploadsConfig}${image}`,
                title: image,
              }))
            : []
        }
        parse={(value) =>
          value.map((file) => {
            // Если это новый файл (имеет rawFile), вернем только его имя
            if (file.rawFile) {
              return file.rawFile;
            }
            // Если это старое изображение (имеет только src), извлекаем имя файла
            return file.src.replace(`${uploadsConfig}`, '');
          })
        }
      >
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput source="description" label="Description" />

      <TextInput source="characteristics" label="Характеристики" />
      <CategorySelectInput source="categoryId" label="Category" />
    </SimpleForm>
  </Edit>
);
