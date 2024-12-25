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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Main_Page />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/informatio" element={<InfoPage />} />
          <Route path="*" element={<Non_Found_Page />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
