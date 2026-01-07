import React from 'react';
import classes from './Footer.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function Footer({ children, ...props }) {
  return (
    <>

          <div className={classes.container}>
            <span>©{new Date().getFullYear()} ALAZAR STUDIO. ALL RIGHT RESERVED.</span>
          </div>

    </>
  );
}

export default Footer;
