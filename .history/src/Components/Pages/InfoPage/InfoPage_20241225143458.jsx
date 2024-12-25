import React from 'react';
import classes from './InfoPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import Container1 from '../../ui/InfoPage/Container1/Container1';

function InfoPage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.title}>
            <span>О</span>
            <span>НАС</span>
          </div>
<Container1/>
<Conta
          <div className={classes.container2}>
            <div className={classes.container2Title}>
              <span>КЛЮЧЕВЫЕ</span>
              <span>НАПРАВЛЕНИЯ</span>
            </div>
            <div className={classes.container2Info}>
              <div className={classes.container2InfoLeft}>
                <div className={classes.container2InfoElement}>
                  <img src="/images/infoBall.png" />
                  <span>Разработка сайтов</span>
                </div>
                <div className={classes.container2InfoElement}>
                  <img src="/images/infoBall.png" />
                  <span>Техническая и дизайн-поддержка</span>
                </div>
                <div className={classes.container2InfoElement}>
                  <img src="/images/infoBall.png" />
                  <span>SEO-продвижение</span>
                </div>
              </div>
              <div className={classes.container2InfoRight}>
                <div className={classes.container2InfoElement}>
                  <img src="/images/infoBall.png" />
                  <span>Графический дизайн</span>
                </div>
                <div className={classes.container2InfoElement}>
                  <img src="/images/infoBall.png" />
                  <span>Моушн-дизай</span>
                </div>
                <div className={classes.container2InfoElement}>
                  <img src="/images/infoBall.png" />
                  <span>Видеомонтаж</span>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.container3}></div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default InfoPage;
