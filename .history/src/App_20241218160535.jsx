import React from 'react';
import { Route, Routes } from 'react-router-dom';

// import Main_Page from "./Components/Pages/Main_Page";
import Non_Found_Page from './Components/Pages/Non_Found_Page';
import Layout from './Components/Standart/Layout/Layout';
import HomePage from './Components/Pages/HomePage/HomePage';
import CasesPage from './Components/Pages/CasesPage/CasesPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Main_Page />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="*" element={<Non_Found_Page />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
