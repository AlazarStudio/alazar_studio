import React, { useEffect, useState } from 'react';
import classes from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

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
            {' '}
            <img
              src="/images/headerLogo.png"
              alt="Логотип"
              className={classes.logo}
            />
          </li>
          <li>
            <Link to="/">ГЛАВНАЯ</Link>
          </li>
          <li>
            <Link to="/service">УСЛУГИ</Link>
          </li>
          <li>
            <Link to="/cases">КЕЙСЫ</Link>
          </li>
          <li>
            <Link to="/shop">МАГАЗИН</Link>
          </li>
          <li>
            <Link to="/about">О НАС</Link>
          </li>
          <li>
            <Link to="/contacts">КОНТАКТЫ</Link>
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
            onc
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
              <Link to="/">ГЛАВНАЯ</Link>
            </li>
            <li>
              <Link to="/service">УСЛУГИ</Link>
            </li>
            <li>
              <Link to="/cases">КЕЙСЫ</Link>
            </li>
            <li>
              <Link to="/shop">МАГАЗИН</Link>
            </li>
            <li>
              <Link to="/about">О НАС</Link>
            </li>
            <li>
              <Link to="/contacts">КОНТАКТЫ</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
