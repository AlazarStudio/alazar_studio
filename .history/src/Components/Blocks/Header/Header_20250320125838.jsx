import React from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';

function Header() {

  
  return (
    <div className={classes.container}>
      <div className={classes.containerNav}>
        <ul>
          <img src="/images/headerLogo.png" alt="Логотип" />
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
