import React, { useEffect, useState } from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

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



      <div
        className={`${classes.containerNavMobile} ${
          isScrolled ? classes.scrolled : ''
        }`}
      >
        <ul>
          <li>
            {' '}
          
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
    </div>
  );
}

export default Header;
