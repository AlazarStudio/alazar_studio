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
                <svg
                  width="36"
                  height="31"
                  viewBox="0 0 36 31"
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
