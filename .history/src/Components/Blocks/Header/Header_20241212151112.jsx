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
              <svg width="35" height="30" xmlns="/images/Log">...</svg>

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
