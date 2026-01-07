import React, { useEffect, useState } from 'react';
import classes from './Header.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import serverConfig from '../../../serverConfig';

function transliterate(str) {
  const ru = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ы: 'y',
    э: 'e',
    ю: 'yu',
    я: 'ya',
    ' ': '-',
    ь: '',
    ъ: '',
  };
  return str
    .split('')
    .map((char) => ru[char.toLowerCase()] || char)
    .join('');
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Определяем активную страницу
  const isActive = (path) => {
    if (path === '/') {
      // Для главной страницы проверяем точное совпадение
      return location.pathname === '/' || location.pathname === '';
    }
    // Для остальных страниц проверяем, что путь начинается с path
    return location.pathname.startsWith(path) && location.pathname !== '/';
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={classes.container}>
      <div
        className={`${classes.containerNav} ${
          isScrolled ? classes.scrolled : ''
        }`}
      >
        <ul>
          <li>
            <img
              src="/images/LogoNew.svg"
              alt="Логотип"
              className={classes.logo}
              onClick={() => navigate('/')}
            />
          </li>
          <li>
            <Link 
              to="/" 
              className={isActive('/') ? classes.active : ''}
            >
              ГЛАВНАЯ
            </Link>
          </li>
          <li>
            <Link 
              to="/service" 
              className={isActive('/service') ? classes.active : ''}
            >
              УСЛУГИ
            </Link>
          </li>
          <li>
            <Link 
              to="/cases" 
              className={isActive('/cases') ? classes.active : ''}
            >
              КЕЙСЫ
            </Link>
          </li>
          {/* <li>
            <Link to="/shop">МАГАЗИН</Link>
          </li> */}
          <li>
            <Link 
              to="/about" 
              className={isActive('/about') ? classes.active : ''}
            >
              О НАС
            </Link>
          </li>
          <li>
            <Link 
              to="/contacts" 
              className={isActive('/contacts') ? classes.active : ''}
            >
              КОНТАКТЫ
            </Link>
          </li>
        </ul>
      </div>

      {/* Мобильная версия */}
      <div
        className={`${classes.containerNavMobile} ${
          isScrolled ? classes.scrolled : ''
        }`}
      >
        <img
          src="/images/LogoAlazarM.png"
          alt="Логотип"
          className={classes.logoMobile}
          onClick={() => navigate('/')}
        />

        {/* Иконка меню, по клику открывается меню */}
        <img
          src="/images/headerMobil.png"
          alt="Меню"
          className={classes.menuIcon}
          onClick={toggleMenu}
        />

        {/* Блок с меню */}
        <div
          className={`${classes.menu} ${isMenuOpen ? classes.open : ''}`}
          onClick={closeMenu}
        >
          <ul>
            <li>
              <Link 
                to="/" 
                onClick={closeMenu}
                className={isActive('/') ? classes.active : ''}
              >
                ГЛАВНАЯ
              </Link>
            </li>
            <li>
              <Link 
                to="/service" 
                onClick={closeMenu}
                className={isActive('/service') ? classes.active : ''}
              >
                УСЛУГИ
              </Link>
            </li>
            <li>
              <Link 
                to="/cases" 
                onClick={closeMenu}
                className={isActive('/cases') ? classes.active : ''}
              >
                КЕЙСЫ
              </Link>
            </li>
            {/* <li>
              <Link to="/shop" onClick={closeMenu}>
                МАГАЗИН
              </Link>
            </li> */}
            <li>
              <Link 
                to="/about" 
                onClick={closeMenu}
                className={isActive('/about') ? classes.active : ''}
              >
                О НАС
              </Link>
            </li>
            <li>
              <Link 
                to="/contacts" 
                onClick={closeMenu}
                className={isActive('/contacts') ? classes.active : ''}
              >
                КОНТАКТЫ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
