import React, { useEffect, useState } from 'react';
import classes from './Advocate.module.css';
import { useNavigate } from 'react-router-dom';

function Advocate({ children, ...props }) {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
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
        <img src="/images/Advocate7.png" style={{ transform: `translateY(${scrollY * 0.03}px)` }}/>
        <img src="/images/Advocate2.png" style={{ transform: `translateX(${scrollY * -0.005}px)` }}/>
        <img src="/images/Advocate3.png" style={{ transform: `translateY(${scrollY * -0.13}px)` }}/>
        <img src="/images/Advocate4.png" style={{ transform: `translateY(${scrollY * 0.03}px)` }}/>
        <img src="/images/Advocate5.png" style={{ transform: `translateY(${scrollY * -0.22}px)` }}/>
        <img src="/images/Advocate7.png" style={{ transform: `translateX(${scrollY * -0.36}px)` }}/>
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
      <div className={classes.containerMedia}>
        <img src="/images/AdvocateName.png" />
        <img src="/images/Advocate7.png" style={{ transform: `translateY(${scrollY * 0.03}px)` }}/>
        <img src="/images/Advocate2.png" style={{ transform: `translateX(${scrollY * -0.005}px)` }}/>
        <img src="/images/Advocate3.png" style={{ transform: `translateY(${scrollY * 0.3}px)` }}/>
        <img src="/images/Advocate5.png" style={{ transform: `translateY(${scrollY * -0.22}px)` }}/>
        <img src="/images/Advocate7.png" style={{ transform: `translateX(${scrollY * 0.06}px)` }}/>
        <div className={classes.ContainerMediaBottom}>
          <div className={classes.ContainerMediaBottom1}>
            <span>R&B АДВОКАТЫ</span>
            <span>Сайт коллегии адвокатов</span>
          </div>
          <div className={classes.ContainerMediaBottom2}>
          
            <button onClick={() => navigate('/cases')}>WEB-ДИЗАЙН</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Advocate;
