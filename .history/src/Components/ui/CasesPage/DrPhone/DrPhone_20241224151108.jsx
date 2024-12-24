import React, { useEffect, useState } from 'react';
import classes from './DrPhone.module.css';
import { useNavigate } from 'react-router-dom';

function DrPhone() {
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
      <div className={classes.Container}>
        <div className={classes.ContainerLeft}>
          <img src="/images/drName.png" alt="" />
          <img src="/images/drImg.png" alt="" />
        </div>
        <div className={classes.ContainerRight}>
          <img
            src="/images/iPhone11.png"
            alt=""
            style={{ transform: `translateY(${scrollY * -1.9}px)` }} // Движение вверх
          />
          <img
            src="/images/iPhone22.png"
            alt=""
            style={{ transform: `translateY(${scrollY * 0.34}px)` }} // Движение вниз
          />
          <img
            src="/images/iPhone33.png"
            alt=""
            style={{ transform: `translateY(${scrollY * -0.42}px)` }} // Движение вверх
          />
        </div>
        <div className={classes.ContainerBottom}>
          <div className={classes.ContainerBottom1}>
            <span>DR.PHONE</span>
          </div>
          <div className={classes.ContainerBottom2}>
            <span>Ремонт и продажа мобильных устройств</span>
            <button onClick={() => navigate('/cases')}>
              ЛОГОТИП И ФИРСТИЛЬ
            </button>
            <button onClick={() => navigate('/cases')}>WEB-ДИЗАЙН</button>
            <button onClick={() => navigate('/cases')}>
              РЕКЛАМНАЯ ПРОДУКЦИЯ
            </button>
          </div>
        </div>
      </div>
      <div className={classes.ContainerMedia}>
        <div className={classes.ContainerMediaRight}>
          <img
            src="/images/iPhone11.png"
            alt=""
            style={{ transform: `translateY(${scrollY * -0.19}px)` }} // Движение вверх
          />
          <img
            src="/images/iPhone22.png"
            alt=""
            style={{ transform: `translateY(${scrollY * 0.2}px)` }} // Движение вниз
          />
          <img
            src="/images/iPhone33.png"
            alt=""
            style={{ transform: `translateY(${scrollY * -0.25}px)` }} // Движение вверх
          />
        </div>
        <div className={classes.ContainerMediaBottom}>
          <div className={classes.ContainerMediaBottom1}>
            <span>DR.PHONE</span>
            <span>Ремонт и продажа мобильных устройств</span>
          </div>
          <div className={classes.ContainerMediaBottom2}>
         
            <button onClick={() => navigate('/cases')}>
              ЛОГОТИП И ФИРСТИЛЬ
            </button>
            <button onClick={() => navigate('/cases')}>WEB-ДИЗАЙН</button>
            <button onClick={() => navigate('/cases')}>
              РЕКЛАМНАЯ ПРОДУКЦИЯ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DrPhone;
