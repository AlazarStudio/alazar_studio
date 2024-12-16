import React, { useEffect, useState } from 'react';
import classes from './DrPhone.module.css';

function DrPhone() {
  const [scrollY, setScrollY] = useState(0);

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
    <div className={classes.Container}>
      <div className={classes.ContainerLeft}>
        <img src="/images/drName.png" alt="" />
        <img src="/images/drImg.png" alt="" />
      </div>
      <div className={classes.ContainerRight}>
        <img
          src="/images/iPhone11.png"
          alt=""
          style={{ transform: `translateY(${scrollY * -0.2}px)` }} // Движение вверх
        />
        <img
          src="/images/iPhone22.png"
          alt=""
          style={{ transform: `translateY(${scrollY * 0.3}px)` }} // Движение вниз
        />
        <img
          src="/images/iPhone33.png"
          alt=""
          style={{ transform: `translateY(${scrollY * -0.3}px)` }} // Движение вверх
        />
      </div>
      <div className={classes.ContainerBottom}>
        <div className={classes.ContainerBottom1}>
            <span>DR.PHONE</span>
        </div>
        <div className={classes.ContainerBottom2}>
            <span>Р</span>
        </div>
      </div>
    </div>
  );
}

export default DrPhone;
