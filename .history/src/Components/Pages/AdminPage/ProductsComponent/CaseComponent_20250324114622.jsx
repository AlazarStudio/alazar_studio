import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  Create,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  ReferenceArrayInput,
  SelectArrayInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
  useGetList,
  Edit,
} from 'react-admin';
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
    return <div>Ошибка загрузки категорий</div>;
  }

  const choices = data.map((category) => ({
    id: category.id,
    name: category.title,
  }));

  return <SelectInput source={source} label={label} choices={choices} />;
};

export const CaseList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Название" />
      <TextField source="price" label="Цена" />
      <TextField source="website" label="Сайт" />
      <TextField source="developer.name" label="Разработчик" />
      <TextField source="categories" label="Категории" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);


export const CaseCreate = (props) => (
  <Create {...props} transform={handleSave}>
    <SimpleForm>
      <TextInput source="name" label="Название" />
      <NumberInput source="price" label="Цена" />
      <TextInput source="website" label="Сайт" />
      <ReferenceInput
        source="developerId"
        reference="developers"
        label="Разработчик"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
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


// Редактирование разработчика
export const DeveloperEdit = (props) => (
  <Edit {...props} transform={handleSaveWithImages}>
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
                src: image.includes('http') ? image : `${uploadsConfig}${image}`,
                title: image,
              }))
            : []
        }
        parse={(value) =>
          Array.isArray(value)
            ? value.map((file) =>
                file.rawFile ? file.rawFile : file.src.replace(`${uploadsConfig}`, '')
              )
            : []
        }
      >
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
