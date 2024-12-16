import React from 'react';
import classes from './Advocate.module.css';
import { useNavigate } from 'react-router-dom';

function Advocate({ children, ...props }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.container}>
      <img src="/images/AdvocateName.png" />
        <img src="/images/Advocate7.png" style={{ transform: `translateY(${scrollY * 0.05}px)` }} />
        <img src="/images/Advocate2.png" />
        <img src="/images/Advocate3.png" />
        <img src="/images/Advocate4.png" />
        <img src="/images/Advocate5.png" />
        <img src="/images/Advocate7.png" />
        <div className={classes.ContainerBottom}>
          <div className={classes.ContainerBottom1}>
            <span>R&B АДВОКАТЫ</span>
          </div>
          <div className={classes.ContainerBottom2}>
            <span>Сайт коллегии адвокатов</span>
            <button onClick={() => navigate('/cases')}>WEB-ДИЗАЙН</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Advocate;
