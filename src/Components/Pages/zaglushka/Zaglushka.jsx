import React from 'react';
import classes from './Zaglushka.module.css';
import LogoParticles from '../../ui/HomePage/LogoParticles/LogoParticles';

export default function Zaglushka() {
  return (
    <div className={classes.container}>
      <div className={classes.container1}>
        <img src="/images/LogoNew.svg" className={classes.logo} alt="Logo" />
        <div className={classes.top}>
          <LogoParticles scaleX={1} scaleY={1.4} />
        </div>
        <div className={classes.blockBottom}>
          <div className={classes.blockBottomEl}>
            <img src="/images/phoneWhite.svg" alt="Телефон" />
            <a href="tel:+79283874497">8&nbsp;928&nbsp;387&nbsp;44&nbsp;97</a>
          </div>
          <div className={classes.blockBottomEl}>
            <img src="/images/mailWhite.svg" alt="Email" />
            <a href="mailto:info@alazarstudio.ru">info@alazarstudio.ru</a>
          </div>
        </div>
      </div>
    </div>
  );
}
