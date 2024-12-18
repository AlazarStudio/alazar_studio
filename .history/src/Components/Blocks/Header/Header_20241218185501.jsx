import React, { useState, useEffect, useRef } from 'react';
import classes from './Header.module.css';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import { Link, useNavigate } from 'react-router-dom';

function Header({ children, ...props }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // Закрытие меню при клике вне
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className={classes.headerContainer}>
        <CenterBlock>
          <WidthBlock>
            <div className={classes.media}>
              <div className={classes.mediaLogo} onClick={() => navigate('/')}>
                <svg
                  width="56"
                  height="41"
                  viewBox="9 0 16 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 30.6642L13.5361 0H22.0782L28.7512 15.5015H20.6013L16.0329 4.24933H19.4499L13.8066 18.3111H21.7166L24.2498 24.7067H11.2398L8.84882 30.6642H0Z"
                    fill="white"
                  />
                  <path
                    d="M33.9969 27.516L35.371 30.6642H26.6197L25.3701 27.516H33.9969Z"
                    fill="#E5097F"
                  />
                </svg>
              </div>
              <div className={classes.mediaMenu} onClick={toggleMenu}>
                <svg
                  width="23"
                  height="16"
                  viewBox="0 0 23 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23 15.8321H0V13.3321H23V15.8321ZM23 9.58209H0V7.08209H23V9.58209ZM23 3.33209H0V0.832092H23V3.33209Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            {isMenuOpen && (
              <div ref={menuRef} className={classes.dropdownMenu}>
                <ul>
                  <li>
                    <Link to="/" onClick={toggleMenu}>
                      ГЛАВНАЯ
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" onClick={toggleMenu}>
                      УСЛУГИ
                    </Link>
                  </li>
                  <li>
                    <Link to="/cases" onClick={toggleMenu}>
                      КЕЙСЫ
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop" onClick={toggleMenu}>
                      МАГАЗИН
                    </Link>
                  </li>
                  <li>
                    <Link to="/information" onClick={toggleMenu}>
                      О НАС
                    </Link>
                  </li>
                  <li>
                    <Link to="/contacts" onClick={toggleMenu}>
                      КОНТАКТЫ
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            <ul className={classes.navigate}>
              <li>
                <Link to="/">ГЛАВНАЯ</Link>
              </li>
              <li>
                <Link to="/services">УСЛУГИ</Link>
              </li>
              <li>
                <Link to="/cases">КЕЙСЫ</Link>
              </li>
              <li>
                <img
                  src="/images/Logo.png"
                  alt="Логотип"
                  onClick={() => navigate('/')}
                />
              </li>
              <li>
                <Link to="/shop">МАГАЗИН</Link>
              </li>
              <li>
                <Link to="/information">О НАС</Link>
              </li>
              <li>
                <Link to="/contacts">КОНТАКТЫ</Link>
              </li>
            </ul>
          </WidthBlock>
        </CenterBlock>
      </div>
    </>
  );
}

export default Header;
