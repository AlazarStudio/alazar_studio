import React from 'react';
import classes from './Container3.module.css';

function Container3({ children, ...props }) {
  return (
    <>
      <div className={classes.container3}>
        <div className={classes.container3Left}>
          <img src="/images/Container3Img.png" />
        </div>
        <div className={classes.container3LeftMedia}>
          <img src="/images/Container3Left1.png" />
          <img src="/images/Container3Left2.png" />
        </div>
        <div className={classes.container3Center}>
          <div className={classes.container3Element}>
            <span>3 МЕСЯЦА</span>
            <span>необходимо для выпуска первой стабильной версии проекта</span>
          </div>
          <div className={classes.container3Element}>
            <span>3 ДНЯ</span>
            <span>достаточно, чтобы точно оценить стоимость проекта</span>
          </div>
          <div className={classes.container3Element}>
            <span>7 ДНЕЙ</span>
            <span>среднее время создания основного эскиза проекта</span>
          </div>
        </div>
        <div className={classes.container3Right}>
          <div className={classes.container3Element}>
            <span>2 ЧАСА</span>
            <span>среднее время реагирования </span>
          </div>
          <div className={classes.container3Element}>
            <span>4-6</span>
            <span>
              специалистов участвует в разработке вашего проекта. Руководитель
              проекта, аналитик, дизайнеры, разработчики, тестировщик
            </span>
          </div>
        </div>
        <div className={classes.container3RightMedia}>
          <div className={classes.container3RightMediaElement}>
            <span>3 МЕСЯЦА</span>
            <span>необходимо для выпуска первой стабильной версии проекта</span>
          </div>
          <div className={classes.container3RightMediaElement}>
            <span>3 ДНЯ</span>
            <span>достаточно, чтобы точно оценить стоимость проекта</span>
          </div>
          <div className={classes.container3RightMediaElement}>
            <span>7 ДНЕЙ</span>
            <span>среднее время создания основного эскиза проекта</span>
          </div>
        </div>

        <div className={classes.container3RightMediaElement}>
          <span>2 ЧАСА</span>
          <span>среднее время реагирования </span>
        </div>
        <div className={classes.container3RightMediaElement}>
          <span>4-6</span>
          <span>
            специалистов участвует в разработке вашего проекта. Руководитель
            проекта, аналитик, дизайнеры, разработчики, тестировщик
          </span>
        </div>
      </div>
    </>
  );
}

export default Container3;
