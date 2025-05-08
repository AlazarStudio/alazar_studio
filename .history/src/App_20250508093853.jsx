import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Non_Found_Page from './Components/Pages/Non_Found_Page';
import Layout from './Components/Standart/Layout/Layout';
// import AdminPage from './Components/Pages/AdminPage/AdminPage';
import HomePage from './Components/Pages/HomePage/HomePage';
import AdminPage from './Components/Pages/AdminPage/AdminPage';
import CasesPage from './Components/Pages/CasesPage/CasesPage';
import OneCasePage from './Components/Pages/OneCasePage/OneCasePage';
import ServicePage from './Components/Pages/ServicePage/ServicePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/:categoryTitle" element={<HomePage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/cases/:categoryTitle" element={<CasesPage />} />

          <Route path="/service" element={<ServicePage />} />

          <Route path="/case/:id" element={<OneCasePage />} />

          <Route path="*" element={<Non_Found_Page />} />
        </Route>
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
