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
                <div className={classes}
              <div className={classes.containerTopServiceElementsItem}>
                <img src="/images/Ellipse 28.png" />
                <span>Логотип</span>
              </div>
              <div className={classes.containerTopServiceElementsItem}>
                <img src="/images/Ellipse 28.png" />
                <span></span>
              </div>
              <div className={classes.containerTopServiceElementsItem}>
                <img src="/images/Ellipse 28.png" />
                <span></span>
              </div>
              <div className={classes.containerTopServiceElementsItem}>
                <img src="/images/Ellipse 28.png" />
                <span></span>
              </div>
              <div className={classes.containerTopServiceElementsItem}>
                <img src="/images/Ellipse 28.png" />
                <span></span>
              </div>
              <div className={classes.containerTopServiceElementsItem}>
                <img src="/images/Ellipse 28.png" />
                <span></span>
              </div>
              <div className={classes.containerTopServiceElementsItem}>
                <img src="/images/Ellipse 28.png" />
                <span></span>
              </div>
              <div className={classes.containerTopServiceElementsItem}>
                <img src="/images/Ellipse 28.png" />
                <span></span>
              </div>
              <div className={classes.containerTopServiceElementsItem}>
                <img src="/images/Ellipse 28.png" />
                <span></span>
              </div>
              <div className={classes.containerTopServiceElementsItem}>
                <img src="/images/Ellipse 28.png" />
                <span></span>
              </div>
              <div className={classes.containerTopServiceElementsItem}>
                <img src="/images/Ellipse 28.png" />
                <span></span>
              </div>
              <div className={classes.containerTopServiceElementsItem}>
                <img src="/images/Ellipse 28.png" />
                <span></span>
              </div>
            </div>

            <div className={classes.containerTopServiceType}>Разработка</div>
            <div className={classes.containerTopServiceElements}>
              <div className={classes.containerTopServiceElementsItem}>
                <img src="/images/Ellipse 28.png" />
                <span></span>
              </div>
              <div className={classes.containerTopServiceElementsItem}>
                <img src="/images/Ellipse 28.png" />
                <span></span>
              </div>
              <div className={classes.containerTopServiceElementsItem}>
                <img src="/images/Ellipse 28.png" />
                <span></span>
              </div>
              <div className={classes.containerTopServiceElementsItem}>
                <img src="/images/Ellipse 28.png" />
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.containerBottom}></div>
      </div>
    </>
  );
}

export default ServicePage;
