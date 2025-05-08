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
  FunctionField,
  DateInput,
  DateField,
} from 'react-admin';
import { handleSave, handleSaveWithImages } from '../JS/fileUploadUtils';
import uploadsConfig from '../../../../uploadsConfig';

// Список
export const CaseHomeList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Название" />
      <TextField source="website" label="Сайт" />
      <DateField source="date" label="Дата" showTime={false} />

      {/* Исправлено: один разработчик */}
      <FunctionField
        label="Разработчики"
        render={(record) =>
          record.developers?.length
            ? record.developers.map((dev) => dev.name).join(', ')
            : 'Нет разработчиков'
        }
      />

      {/* Исправлено: категории отображаются строкой */}
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

// Создание
export const CaseHomeCreate = (props) => (
  <Create {...props} transform={handleSave}>
    <SimpleForm>
      <TextInput source="name" label="Название" />
      <NumberInput source="price" label="Цена" />
      <TextInput source="website" label="Сайт" />
      <ReferenceArrayInput
        source="developerIds"
        reference="developers"
        label="Разработчики"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
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

// Редактирование
export const CaseHomeEdit = (props) => (
  <Edit {...props} transform={handleSaveWithImages}>
    <SimpleForm>
      <TextInput source="name" label="Название" />
      <NumberInput source="price" label="Цена" />
      <TextInput source="website" label="Сайт" />
      <ReferenceArrayInput
        source="developerIds"
        reference="developers"
        label="Разработчики"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
      <ReferenceArrayInput
        source="categoryIds"
        reference="categories"
        label="Категории"
      >
        <SelectArrayInput optionText="title" />
      </ReferenceArrayInput>

      {/* Загрузка новых изображений */}
      <ImageInput
        source="imagesRaw"
        label="Загрузить новые изображения"
        multiple
        accept="image/*"
      >
        <ImageField source="src" title="title" />
      </ImageInput>

      {/* Отображение старых изображений */}
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
