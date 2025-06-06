import React, { useEffect, useState } from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Закрываем меню при клике вне его
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Переключаем состояние меню
  };

  return (
    <div className={classes.container}>
      {/* Десктопное меню */}
      <div
        className={`${classes.containerNav} ${isScrolled ? classes.scrolled : ''}`}
      >
        <ul>
          <li>
            <img
              src="/images/headerLogo.png"
              alt="Логотип"
              className={classes.logo}
            />
          </li>
          <li><Link to="/">ГЛАВНАЯ</Link></li>
          <li><Link to="/service">УСЛУГИ</Link></li>
          <li><Link to="/cases">КЕЙСЫ</Link></li>
          <li><Link to="/shop">МАГАЗИН</Link></li>
          <li><Link to="/about">О НАС</Link></li>
          <li><Link to="/contacts">КОНТАКТЫ</Link></li>
        </ul>
      </div>

      {/* Мобильное меню */}
      <div
        className={`${classes.containerNavMobile} ${isScrolled ? classes.scrolled : ''}`}
      >
        <img
          src="/images/LogoAlazarM.png"
          alt="Логотип"
          className={classes.logoMobile}
        />

        {/* Иконка меню */}
        <img
          src="/images/headerMobil.png"
          alt="Меню"
          className={classes.menuIcon}
          onClick={toggleMenu} // Открыть/закрыть меню
        />

        {/* Блок с меню */}
        <div

          className={`${classes.menu} ${isMenuOpen ? classes.open : ''}`}
        >
          <ul>
            <li><Link to="/">ГЛАВНАЯ</Link></li>
            <li><Link to="/service">УСЛУГИ</Link></li>
            <li><Link to="/cases">КЕЙСЫ</Link></li>
            <li><Link to="/shop">МАГАЗИН</Link></li>
            <li><Link to="/about">О НАС</Link></li>
            <li><Link to="/contacts">КОНТАКТЫ</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
