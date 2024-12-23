import React, { useEffect, useState } from 'react';
import classes from './Business.module.css';
import { useNavigate } from 'react-router-dom';

function Business({ children, ...props }) {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  // Обработчик прокрутки
  const handleScroll = () => {
    setScrollY(window.scrollY); // Обновляем состояние на основе текущей прокрутки
  };

  // Добавление события прокрутки при монтировании компонента
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Убираем обработчик при размонтировании
    };
  }, []);

  return (
    <div className={classes.container}>
      <img
        src="/images/business.png" // Двигаем картинку на основе прокрутки
      />
      <div className={classes.ContainerBottom}>
        <div className={classes.ContainerBottom1}>
          <span> «Мой бизнес. Молодежь будущего»</span>
        </div>
        <div className={classes.ContainerBottom2}>
          <span>Брендирование форума «Мой бизнес. Молодежь будущего»</span>
          <div>
            <button onClick={() => navigate('/cases')}>
              РЕКЛАМНАЯ ПРОДУКЦИЯ
            </button>
            <button onClick={() => navigate('/cases')}>
              ЛОГОТИП И ФИРСТИЛЬ
            </button>
          </div>
        </div>
      </div>
      <div className={classes.ContainerMediaBottom}>
        <div className={classes.ContainerMediaBottom1}>
          <span> «Мой бизнес. Молодежь будущего»</span>
        </div>
        <div className={classes.ContainerBottom2}>
          <span>Брендирование форума «Мой бизнес. Молодежь будущего»</span>
          <div>
            <button onClick={() => navigate('/cases')}>
              РЕКЛАМНАЯ ПРОДУКЦИЯ
            </button>
            <button onClick={() => navigate('/cases')}>
              ЛОГОТИП И ФИРСТИЛЬ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Business;
