import React from 'react';
import classes from './ServicePage.module.css';

function ServicePage({ children, ...props }) {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.containerTop}>
          <img src="" />
          <div className={classes.containerTopService}>
            <div className={classes.containerTopServiceTitle}>
              <span>НАШИ</span>
              <span>УСЛУГИ</span>
            </div>
            <div className={classes.containerTopServiceType}>Дизайн</div>
            <div className={classes.containerTopServiceElements}>
            <div className={classes.containerTopServiceElementsItem}>
                <
                </div>
            </div>
            <div className={classes.containerTopServiceType}>Разработка</div>
          </div>
        </div>
        <div className={classes.containerBottom}></div>
      </div>
    </>
  );
}

export default ServicePage;
