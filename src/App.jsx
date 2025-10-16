import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Non_Found_Page from './Components/Pages/Non_Found_Page';
import Layout from './Components/Standart/Layout/Layout';
// import AdminPage from './Components/Pages/AdminPage/AdminPage';
import HomePage from './Components/Pages/HomePage/HomePage';
import OneCasePage from './Components/Pages/OneCasePage/OneCasePage';
import ServicePage from './Components/Pages/ServicePage/ServicePage';
import ProtectedRoute from './Components/Pages/AdminNew/ProtectedRoute';
import AdminPage from './Components/Pages/AdminPage';
import LoginPage from './Components/Pages/LoginPage';
import CategoriesPage from './Components/Pages/AdminNew/CategoriesPage/CategoriesPage';
import DevelopersPage from './Components/Pages/DevelopersPage';
import CasesPage from './Components/Pages/AdminNew/AdminCasesPage/CasesPage';
import ShopPage from './Components/Pages/ShopPage/ShopPage';
import AboutPage from './Components/Pages/AboutPage/AboutPage';
import { ContactPage } from '@mui/icons-material';
import ContactsPage from './Components/Pages/ContacsPage/ContactsPage';
import DiscussionTable from './Components/Pages/AdminNew/DiscussionPage/DiscussionTable';
import CaseShopPage from './Components/Pages/AdminNew/AdminCasesPage/CaseShopPage';
import AllCasesPage from './Components/Pages/AllCasesPage/AllCasesPage';
import ShopsPage from './Components/Pages/ShopsPage/ShopsPage';
// import MusicPlayer from './Components/ui/MusicPlayer';
import CustomCursor from './Components/ui/CustomCursor/CustomCursor';
// import Lenis from '@studio-freight/lenis';
import { useLenisScroll } from './useLenisScroll';
import Zaglushka from './Components/Pages/zaglushka/Zaglushka';

function App() {
  // useLenisScroll();

  return (
    <>
      {/* <MusicPlayer /> */}
      <CustomCursor />

      <div data-lenis-scroll>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Zaglushka />} />
            {/* <Route path="/:categoryTitle" element={<HomePage />} /> */}
            {/* <Route path="/:categoryTitle/:caseTitle" element={<HomePage />} /> */}
            {/* <Route path="/case/:caseTitle" element={<HomePage />} /> */}
            {/* <Route path="/shop" element={<ShopPage />} /> */}
            {/* <Route path="/about" element={<AboutPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/cases/*" element={<AllCasesPage />} />
            <Route path="/shop/*" element={<ShopsPage />} /> */}
            {/* <Route path="/cases/:categoryTitle" element={<CasesPage />} />
          <Route path="/cases/:id" element={<CasesPage />} /> */}

            {/* <Route path="/service" element={<ServicePage />} /> */}

            {/* <Route path="/case/:id" element={<OneCasePage />} /> */}
            {/* <Route path="/login" element={<LoginPage />} />

            <Route path="*" element={<Non_Found_Page />} />
          </Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          >
            <Route index element={<CategoriesPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="developers" element={<DevelopersPage />} />
            <Route path="cases" element={<CasesPage />} />
            <Route path="casesShop" element={<CaseShopPage />} />
            <Route path="discussion" element={<DiscussionTable />} /> */}
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
