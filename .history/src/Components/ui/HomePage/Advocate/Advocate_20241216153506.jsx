import React, { useEffect, useRef } from 'react';
import classes from './Advocate.module.css';
import { useNavigate } from 'react-router-dom';

function Advocate({ children, ...props }) {
  const navigate = useNavigate();
  const imagesRef = useRef([]);

  // Коллбэк для IntersectionObserver, добавляющий класс "visible" к изображениям
  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(classes.visible);
        observer.unobserve(entry.target); // Прекращаем отслеживание после того, как изображение становится видимым
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // Срабатывает, когда 50% изображения оказывается в области видимости
    });

    // Наблюдаем за каждым изображением
    imagesRef.current.forEach(img => observer.observe(img));

    return () => observer.disconnect(); // Очищаем наблюдатель при размонтировании компонента
  }, []);

  return (
    <div className={classes.container}>
      <img src="/images/AdvocateName.png" />
      <img ref={el => imagesRef.current[0] = el} src="/images/Advocate7.png" />
      <img ref={el => imagesRef.current[1] = el} src="/images/Advocate2.png" />
      <img ref={el => imagesRef.current[2] = el} src="/images/Advocate3.png" />
      <img ref={el => imagesRef.current[3] = el} src="/images/Advocate4.png" />
      <img ref={el => imagesRef.current[4] = el} src="/images/Advocate5.png" />
      <img ref={el => imagesRef.current[5] = el} src="/images/Advocate7.png" />
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
