import React from 'react';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';
import {
  ProductsCreate,
  ProductsEdit,
  ProductsList,
} from './ProductsComponent/ProductsComponent';
// import LoginPage from './LoginPage1';
import serverConfig from '../../../serverConfig';
// import authProvider from './JS/authProvider';
import { fetchJsonWithToken } from './JS/fetchJsonWithToken';
import {
  CategoriesCreate,
  CategoriesEdit,
  CategoriesList,
} from './ProductsComponent/CategoriesComponent';

import {
  DiscussionsList,
  DiscussionsCreate,
  DiscussionsEdit,
} from './ProductsComponent/DiscussionsComponent';
import authProvider from './JS/authProvider';
import LoginPage from './LoginPage';
import {
  ShopCreate,
  ShopEdit,
  ShopList,
} from './ProductsComponent/ShopComponent';
import { DeveloperCreate, DeveloperEdit, DeveloperList } from './ProductsComponent/DeveloperComponent';
import { CaseCreate, CaseEdit, CaseList } from './ProductsComponent/CaseComponent';
import { CaseHomeCreate, CaseHomeEdit, CaseHomeList } from './ProductsComponent/CaseHomeComponent';

const dataProvider = simpleRestProvider(`${serverConfig}`, fetchJsonWithToken); // Ваш API
const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');

const AdminPage = () => (
  <Admin
    basename="/admin"
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    authProvider={authProvider}
    loginPage={<LoginPage />}
  >
    <Resource
      name="categories"
      list={CategoriesList}
      create={CategoriesCreate}
      edit={CategoriesEdit}
      options={{ label: 'Разработчики' }}
    />
    <Resource
      name="products"
      list={ProductsList}
      create={ProductsCreate}
      edit={ProductsEdit}
    />

<Resource
      name="developers"
      list={DeveloperList}
      create={DeveloperCreate}
      edit={DeveloperEdit}
    />

<Resource
      name="cases"
      list={CaseList}
      create={CaseCreate}
      edit={CaseEdit}
    />

<Resource
      name="casesHome"
      list={CaseHomeList}
      create={CaseHomeCreate}
      edit={CaseHomeEdit}
    />

    <Resource
      name="shops"
      list={ShopList}
      create={ShopCreate}
      edit={ShopEdit}
    />
    <Resource
      name="discussion"
      list={DiscussionsList}
      create={DiscussionsCreate}
      edit={DiscussionsEdit}
    />
  </Admin>
);

export default AdminPage;
