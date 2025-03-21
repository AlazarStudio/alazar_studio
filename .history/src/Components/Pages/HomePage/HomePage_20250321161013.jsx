import React, { useEffect } from 'react';
import classes from './HomePage.module.css';

export default function HomePage() {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.containerLogo}>
          <img src="/images/logoA.png" />
          <div className={classes.containerLogoCenter}>
            <img src="/images/logoAlazar.png" />
            <img src="/images/logoStudio.png" />
          </div>

          <span>СТУДИЯ WEB-РАЗРАБОТКИ И ГРАФИЧЕСКОГО ДИЗАЙНА</span>
        </div>
      </div>
    </>
  );
}
