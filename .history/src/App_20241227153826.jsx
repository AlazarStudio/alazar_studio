import React from 'react';
import { Route, Routes } from 'react-router-dom';

// import Main_Page from "./Components/Pages/Main_Page";
import Non_Found_Page from './Components/Pages/Non_Found_Page';
import Layout from './Components/Standart/Layout/Layout';
import HomePage from './Components/Pages/HomePage/HomePage';
import CasesPage from './Components/Pages/CasesPage/CasesPage';
import ShopPage from './Components/Pages/ShopPage/ShopPage';
import ContactPage from './Components/Pages/ContactPage/ContactPage';
import InfoPage from './Components/Pages/InfoPage/InfoPage';
import AdminPage from './Components/Pages/AdminPage/AdminPage';
import OneProductPage from './Components/Pages/OneProductPage/OneProductPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Main_Page />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/case/:id" element={<OneProductPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:id" element={<OneProductPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/information" element={<InfoPage />} />
          <Route path="/" element={<InfoPage />} />
          <Route path="*" element={<Non_Found_Page />} />
        </Route>
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;