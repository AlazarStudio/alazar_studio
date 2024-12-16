import React, { useEffect, useState } from 'react';
import classes from './Advocate.module.css';
import { useNavigate } from 'react-router-dom';

function Advocate({ children, ...props }) {
  const [scrollY, setScrollY] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setScrollX(window.scrollX);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <div className={classes.container}>
        <img src="/images/AdvocateName.png" />
        <img src="/images/Advocate7.png" style={{ transform: `translateX(${0,400 * 0.01}px)` }} />
        <img src="/images/Advocate2.png" style={{ transform: `translateX(${scrollX * -0.23}px)` }}/>
        <img src="/images/Advocate3.png" style={{ transform: `translateY(${scrollY * -0.23}px)` }}/>
        <img src="/images/Advocate4.png" style={{ transform: `translateY(${scrollY * -0.23}px)` }}/>
        <img src="/images/Advocate5.png" style={{ transform: `translateY(${scrollY * -0.23}px)` }}/>
        <img src="/images/Advocate7.png" style={{ transform: `translateY(${scrollY * -0.23}px)` }}/>
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
