import React, { useEffect, useRef } from 'react';
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
import AdminNewLayout from './Components/Pages/AdminNewMUI/AdminNewLayout';
import CategoriesMUI from './Components/Pages/AdminNewMUI/CategoriesMUI';
import DevelopersMUI from './Components/Pages/AdminNewMUI/DevelopersMUI';
import CasesMUI from './Components/Pages/AdminNewMUI/CasesMUI';
import DiscussionsMUI from './Components/Pages/AdminNewMUI/DiscussionsMUI';
import ShopMUI from './Components/Pages/AdminNewMUI/ShopMUI';
// import MusicPlayer from './Components/ui/MusicPlayer';
import CustomCursor from './Components/ui/CustomCursor/CustomCursor';
// import Lenis from '@studio-freight/lenis';
import { useLenisScroll } from './useLenisScroll';
import Zaglushka from './Components/Pages/zaglushka/Zaglushka';

function App() {
  // useLenisScroll();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const prevPathnameRef = useRef(location.pathname);
  const scrollPositionRef = useRef(0);

  // Прокрутка наверх при переходе на новую страницу
  // Но не прокручиваем, если открывается или закрывается модалка на главной странице
  useEffect(() => {
    const currentPath = location.pathname;
    const prevPath = prevPathnameRef.current;
    
    // Пропускаем первый рендер
    if (prevPath === currentPath) {
      return;
    }
    
    const prevParts = prevPath.split('/').filter(Boolean);
    const currentParts = currentPath.split('/').filter(Boolean);
    
    // Проверяем, что это страница с модалками (главная или /cases)
    const isPageWithModal = !currentPath.startsWith('/shop') &&
                            !currentPath.startsWith('/about') &&
                            !currentPath.startsWith('/contacts') &&
                            !currentPath.startsWith('/service') &&
                            !currentPath.startsWith('/admin');
    
    const wasPageWithModal = !prevPath.startsWith('/shop') &&
                             !prevPath.startsWith('/about') &&
                             !prevPath.startsWith('/contacts') &&
                             !prevPath.startsWith('/service') &&
                             !prevPath.startsWith('/admin');
    
    // Проверяем, не является ли это открытием модалки кейса
    // Модалка открывается когда путь расширяется (добавляется caseTitle к категории или корню)
    const isCaseModalOpen = isPageWithModal && 
                           currentParts.length > prevParts.length && 
                           currentParts.length >= 1;
    
    // Проверяем, не является ли это закрытием модалки кейса
    // Модалка закрывается когда путь уменьшается (убирается caseTitle)
    const isCaseModalClose = isPageWithModal && wasPageWithModal &&
                            currentParts.length < prevParts.length && 
                            prevParts.length >= 1;
    
    // При открытии/закрытии модалки на главной странице или /cases не трогаем скролл вообще
    if (isCaseModalOpen || isCaseModalClose) {
      // Не делаем ничего - скролл остается на месте
      // Просто обновляем ссылку на предыдущий путь
    } else {
      // Обычный переход на другую страницу - прокручиваем наверх
      window.scrollTo(0, 0);
      // Если используется Lenis, можно использовать:
      // const lenisElement = document.querySelector('[data-lenis-scroll]');
      // if (lenisElement && window.lenis) {
      //   window.lenis.scrollTo(0, { immediate: true });
      // }
    }
    
    prevPathnameRef.current = currentPath;
  }, [location.pathname]);

  return (
    <>
      {/* <MusicPlayer /> */}
      {!isAdminPage && <CustomCursor />}

      <div data-lenis-scroll>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/:categoryTitle" element={<HomePage />} />
            <Route path="/:categoryTitle/:caseTitle" element={<HomePage />} />
            <Route path="/case/:caseTitle" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            
            {/* Страница всех кейсов с модалкой */}
            <Route path="/cases" element={<AllCasesPage />} />
            <Route path="/cases/:categorySlug" element={<AllCasesPage />} />
            <Route path="/cases/:categorySlug/:caseSlug" element={<AllCasesPage />} />
            
            <Route path="/shop/*" element={<ShopsPage />} />

            <Route path="/service" element={<ServicePage />} />

            <Route path="*" element={<Non_Found_Page />} />
          </Route>

          <Route path="/admin" element={<AdminNewLayout />}>
            <Route index element={<CategoriesMUI />} />
            <Route path="categories" element={<CategoriesMUI />} />
            <Route path="developers" element={<DevelopersMUI />} />
            <Route path="cases" element={<CasesMUI />} />
            <Route path="discussions" element={<DiscussionsMUI />} />
            <Route path="shop" element={<ShopMUI />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
