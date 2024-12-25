import React from 'react';
import classes from './Container4.module.css';

function Container4({ children, ...props }) {
  return (
    <>
      <div className={classes.container4}>
        <div className={classes.container4Title}>
          <span>НАША</span>
          <span>КОМАНДА</span>
        </div>
        <img src="/images/infoTerB.png" className={classes.line1} />
        <div className={classes.container4PeopleLeft}></div>
        <img src="/images/infoTel.png" className={classes.1} className={classes.line2} />
        <div className={classes.container4PeopleRight}></div>
        <img src="/images/infoTer.png" className={classes.line3} />
        <div className={classes.container4PeopleLeft}></div>
        <img src="/images/infoTel.png" className={classes.line4} />
        <div className={classes.container4PeopleRight}></div>
        <img src="/images/infoTer.png" className={classes.line5} />
        <div className={classes.container4PeopleLeft}></div>
        <img src="/images/infoTel.png" className={classes.line6} />
        <div className={classes.container4PeopleRight}></div>
        <img src="/images/infoTer.png" className={classes.line7} />
        <div className={classes.container4PeopleLeft}></div>
        <img src="/images/infoTel.png" className={classes.line8} />
        <div className={classes.container4PeopleRight}></div>
        <img src="/images/infoTer.png" className={classes.line9} />
        <div className={classes.container4PeopleLeft}></div>
        <img src="/images/infoTel.png" className={classes.line10} />
        <div className={classes.container4PeopleRight}></div>
      </div>
    </>
  );
}

export default Container4;
