import React, { useState } from 'react';
import classes from './Header.module.css';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import { Link, useNavigate } from 'react-router-dom';

function Header({ children, ...props }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className={classes.headerContainer}>
        <CenterBlock>
          <WidthBlock>
            <div className={classes.media}>
              <div className={classes.mediaLogo} onClick={() => navigate('/')}>
              <svg width="370" height="72" viewBox="0 0 370 72" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="370" height="72" fill="#131313" fill-opacity="0.89"/>
<path d="M32 49.6642L45.5361 19H54.0782L60.7512 34.5015H52.6013L48.0329 23.2493H51.4499L45.8066 37.3111H53.7166L56.2498 43.7067H43.2398L40.8488 49.6642H32Z" fill="white"/>
<path d="M65.9969 46.516L67.371 49.6642H58.6197L57.3701 46.516H65.9969Z" fill="#E5097F"/>
<path d="M339 41.8321H316V39.3321H339V41.8321ZM339 35.5821H316V33.0821H339V35.5821ZM339 29.3321H316V26.8321H339V29.3321Z" fill="white"/>
</svg>
              </div>
              <div className={classes.mediaMenu} onClick={toggleMenu}>
                <img src="/images/miniMenu.png" alt="Меню" />
              </div>
            </div>
            <ul
              className={`${classes.navigate} ${
                isMenuOpen ? classes.showMenu : ''
              }`}
            >
              <li>
                <Link to="/">ГЛАВНАЯ</Link>
              </li>
              <li>
                <Link to="/services">УСЛУГИ</Link>
              </li>
              <li>
                <Link to="/cases">КЕЙСЫ</Link>
              </li>
              <img
                src="/images/Logo.png"
                alt="Логотип"
                onClick={() => navigate('/')}
              />
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
