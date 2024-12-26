import React from 'react';
import classes from './Container4.module.css';
import ProjectForm from '../../HomePage/ProjectForm/ProjectForm';

function Container4({ children, ...props }) {
  return (
    <>
      <div className={classes.container4}>
        <div className={classes.container4Title}>
          <span>НАША</span>
          <span>КОМАНДА</span>
        </div>
        <img
          src="/images/infoTerB.png"
          className={`${classes.line1} ${classes.lineFirst}`}
        />
        <div className={classes.container4PeopleLeft}>
          <img src="/images/Azamat.png" />
        </div>
        <img
          src="/images/infoTel.png"
          className={`${classes.lineRight} ${classes.line}`}
        />
        <div className={classes.container4PeopleRight}>
          <img src="/images/Alim.png" />
        </div>
        <img
          src="/images/infoTer.png"
          className={`${classes.lineLeft} ${classes.line}`}
        />
        <div className={classes.container4PeopleLeft}>
          <img src="/images/Muhammad.png" />
        </div>
        <img
          src="/images/infoTel.png"
          className={`${classes.lineRight} ${classes.line}`}
        />
        <div className={classes.container4PeopleRight}>
          <img src="/images/Ruslan.png" />
        </div>
        <img
          src="/images/infoTer.png"
          className={`${classes.lineLeft} ${classes.line}`}
        />
        <div className={classes.container4PeopleLeft}>
          <img src="/images/Amina.png" />
        </div>
        <img
          src="/images/infoTel.png"
          className={`${classes.lineRight} ${classes.line}`}
        />
        <div className={classes.container4PeopleRight}>
          <img src="/images/Viktoriya.png" />
        </div>
        <img
          src="/images/infoTer.png"
          className={`${classes.lineLeft} ${classes.line}`}
        />
        <div className={classes.container4PeopleLeft}>
          <img src="/images/Kseniya.png" />
        </div>
        <img
          src="/images/infoTel.png"
          className={`${classes.lineRight} ${classes.line}`}
        />
        <div className={classes.container4PeopleRight}>
          <img src="/images/Musa.png" />
        </div>
        <img
          src="/images/infoTer.png"
          className={`${classes.lineLeft} ${classes.line}`}
        />
        <div className={classes.container4PeopleLeft}>
          <img src="/images/Hallu.png" />
        </div>
        <img
          src="/images/infoTel.png"
          className={`${classes.lineRight} ${classes.line}`}
        />
        <div className={classes.container4PeopleRight}></div>
        <img
          src="/images/infoTer.png"
          className={`${classes.lineLeft} ${classes.line} ${classes.lineBottom}`}
        />
        <div className={classes.container4Bottom}>
          <span>
            Если у вас есть какие-либо вопросы или вы хотите обсудить
            возможности сотрудничества, пожалуйста, свяжитесь с нами в заявке
            ниже. Мы будем рады ответить на все ваши вопросы и предложить
            индивидуальное решение для вашего проекта ♡
          </span>
        </div>
        <ProjectForm />
      </div>

      <div className={classes.container4Media}>
        <div className={classes.container4MediaTitle}>
          <span>НАША</span>
          <span>КОМАНДА</span>
        </div>
        
      </div>
    </>
  );
}

export default Container4;
