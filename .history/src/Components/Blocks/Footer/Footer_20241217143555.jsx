import React from 'react';
import classes from './Footer.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function Footer({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
            <span>©2024 ALAZAR STUDIO. ALL RIGHT</span>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default Footer;
