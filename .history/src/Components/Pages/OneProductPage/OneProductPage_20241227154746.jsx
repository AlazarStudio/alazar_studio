import React from 'react';
import classes from './OneProductPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';



function OneProductPage({ children, ...props }) {

    
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
            <div className={classes.containerTop}>
              <div className={classes.containerTopLeft}>
                <span>Создание 
                фирменного стиля для</span>
                <span>LUNA</span>
                <span>Салон красоты</span>
              </div>
              <div className={classes.containerTopRight}>
                <img src='/images/test.png'/>
              </div>
            </div>
            <div className={classes.containerBottom}>
                <span>ЛОГОТИП И ФИРСТИЛЬ</span>
                <span>ЛОГОТИП И ФИРСТИЛЬ</span>
                <span>ЛОГОТИП И ФИРСТИЛЬ</span>
                <span>ЛОГОТИП И ФИРСТИЛЬ</span>
                <span>ЛОГОТИП И ФИРСТИЛЬ</span>
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default OneProductPage;
