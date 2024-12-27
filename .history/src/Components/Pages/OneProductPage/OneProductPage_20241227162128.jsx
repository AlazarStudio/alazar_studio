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
            </div>
            <div className={classes.containerImg}>
            <img src='/images/test2.png'/>
            <img src='/images/test1.png'/>
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

<div style="position:relative;overflow:hidden;"><a href="https://yandex.ru/maps/org/tsentralny_rynok/1019628614/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Центральный рынок</a><a href="https://yandex.ru/maps/1104/cherkessk/category/market/184108071/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:14px;">Рынок в Черкесске</a><a href="https://yandex.ru/maps/1104/cherkessk/category/farmers_market/187142065569/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:28px;">Продуктовый рынок в Черкесске</a><iframe src="https://yandex.ru/map-widget/v1/?ll=42.051653%2C44.235749&mode=poi&poi%5Bpoint%5D=42.051934%2C44.236045&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1019628614&z=16.45" width="560" height="400" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div>

export default OneProductPage;
