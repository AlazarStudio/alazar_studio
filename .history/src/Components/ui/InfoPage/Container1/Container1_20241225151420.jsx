import React from 'react';
import classes from './Container1.module.css';

function Container1({ children, ...props }) {
  return (
    <>
      <div className={classes.container1}>
        <img src="/images/.png" />

        <span>
          Наша команда готова предложить вам самые передовые технологии и
          креативные решения для создания уникальных и функциональных цифровых
          продуктов для вашего бизнеса.
          <br />
          <br />
          Мы - команда из опытных профессионалов, обладающих глубокими знаниями
          в области программирования, дизайна и маркетинга, а также постоянно
          повышающих свою квалификацию в данных областях. Мы работаем вместе,
          чтобы создавать качественные и эффективные веб-ресурсы, которые будут
          привлекать внимание пользователей и способствовать развитию вашего
          бизнеса.
        </span>
      </div>
      <div className={classes.container1Media}>
        <span>
          Наша команда готова предложить вам самые передовые технологии и
          креативные решения для создания уникальных и функциональных цифровых
          продуктов для вашего бизнеса.
          <span></span>
          <br />
          <br />
          Мы - команда из опытных профессионалов, обладающих глубокими знаниями
          в области программирования, дизайна и маркетинга, а также постоянно
          повышающих свою квалификацию в данных областях. Мы работаем вместе,
          чтобы создавать качественные и эффективные веб-ресурсы, которые будут
          привлекать внимание пользователей и способствовать развитию вашего
          бизнеса.
        </span>
        <img src="/images/.png" />
      </div>
    </>
  );
}

export default Container1;
