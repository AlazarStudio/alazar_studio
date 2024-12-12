import React, { useState } from 'react';
import classes from './Header.module.css';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import { Link } from 'react-router-dom';

function Header({ children, ...props }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className={classes.headerContainer}>
        <CenterBlock>
          <WidthBlock>
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
              <img src="/images/Logo.png" alt="" />
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
            <div className={classes.menuToggleI} onClick={toggleMenu}>
              <img src="/images/miniMenu.png" alt="" />
            </div>
            <div className={classes.menuToggle} onClick={toggleMenu}>
              <img src="/images/miniMenu.png" alt="" />
            </div>
          </WidthBlock>
        </CenterBlock>
      </div>
    </>
  );
}

export default Header;
