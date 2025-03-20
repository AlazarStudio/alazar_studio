import React, { useState, useEffect, useRef } from 'react';
import classes from './Header.module.css';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import { Link, useNavigate } from 'react-router-dom';

function Header({ children, ...props }) {
  return (
    <>
      <div className={classes.container}>
        <img src="/images/headerLogo.png" />
        <ul>
        <li>
          <Link to="/" >
            ГЛАВНАЯ
          </Link>
        </li>
        <li>
          <Link to="/1" >
           УСЛУГИ
          </Link>
        </li>
        <li>
          <Link to="/1" >
            КЕЙСЫ
          </Link>
        </li>
        <li>
          <Link to="/1" >
            МАГАЗИН
          </Link>
        </li>
        <li>
          <Link to="/1" >
            О НАС
          </Link>
        </li>
        <li>
          <Link to="/1" >
            КОНТАКТЫ
          </Link>
        </li>
      </ul>
      </div>
    
    </>
  );
}

export default Header;
