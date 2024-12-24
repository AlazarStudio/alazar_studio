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
     
        <CenterBlock>
          <WidthBlock>
          <div className={classes.headerContainer}>
            <div className={classes.media}>
              <div className={classes.mediaLogo} onClick={() => navigate('/')}>
                <img src="/images/123.png" />
              </div>
              <div className={classes.mediaMenu} onClick={toggleMenu}>
                <img src="/images/1234.png" />
              </div>
            </div>
            <div
              ref={menuRef}
              className={`${classes.dropdownMenu} ${
                isMenuOpen ? classes.show : ''
              }`}
            >
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

    </>
  );
}

export default Header;
