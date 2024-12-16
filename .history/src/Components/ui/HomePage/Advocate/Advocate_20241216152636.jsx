import React, { useEffect, useState } from 'react';
import classes from './Advocate.module.css';
import { useNavigate } from 'react-router-dom';

function Advocate({ children, ...props }) {
  const navigate = useNavigate();

  const [scrollY, setScrollY] = useState(0);

  // Отслеживаем скролл
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={classes.container}>
      {/* Например:
         - Первый элемент движется слева направо по мере скролла
         - Второй элемент движется справа налево
         - Третий сверху вниз
         - Четвёртый снизу вверх
         и т.д.
      */}

      <img 
        src="/images/AdvocateName.png"
        style={{ 
          transform: `translateX(${Math.max(0, 300 - scrollY * 0.5)}px)` 
        }}
      />
      
      <img 
        src="/images/Advocate7.png"
        style={{ 
          transform: `translateX(${Math.min(0, -300 + scrollY * 0.5)}px)` 
        }}
      />
      
      <img 
        src="/images/Advocate2.png"
        style={{ 
          transform: `translateY(${Math.max(0, 300 - scrollY * 0.5)}px)` 
        }}
      />
      
      <img 
        src="/images/Advocate3.png"
        style={{ 
          transform: `translateY(${Math.min(0, -300 + scrollY * 0.5)}px)` 
        }}
      />
      
      <img 
        src="/images/Advocate4.png"
        style={{ 
          transform: `translateX(${Math.max(0, 400 - scrollY * 0.3)}px)` 
        }}
      />
      
      <img 
        src="/images/Advocate5.png"
        style={{ 
          transform: `translateX(${Math.min(0, -400 + scrollY * 0.3)}px)` 
        }}
      />
      
      <img 
        src="/images/Advocate7.png"
        style={{ 
          transform: `translateY(${Math.max(0, 200 - scrollY * 0.4)}px)` 
        }}
      />

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
  );
}

export default Advocate;
