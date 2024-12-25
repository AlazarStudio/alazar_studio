import React from 'react';
import classes from './InfoPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function InfoPage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.title}>
            <span>О</span>
            <span>НАС</span>
          </div>
          <div className={classes.container1}>
            <img src="/images/.png" />
            <div className={classes.container1Right}>
              <span>
                Наша команда готова предложить вам самые передовые технологии и
                креативные решения для создания уникальных и функциональных
                цифровых продуктов для вашего бизнеса.
                <br />
                <br />
                Мы - команда из опытных профессионалов, обладающих глубокими
                знаниями в области программирования, дизайна и маркетинга, а
                также постоянно повышающих свою квалификацию в данных областях.
                Мы работаем вместе, чтобы создавать качественные и эффективные
                веб-ресурсы, которые будут привлекать внимание пользователей и
                способствовать развитию вашего бизнеса.
              </span>
            </div>
          </div>
          <div className={classes.container2}>
            <div className={classes.container2Title}>
                <span>КЛЮЧЕВЫЕ</span>
                <span>НАПРАВЛЕНИЯ</span>
            </div>
            <div className={classes.container2Info}>
                <img src='/images/.png'
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default InfoPage;
