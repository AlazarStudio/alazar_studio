import React, { useRef, useState, useEffect } from 'react';
import classes from './ScrollOne.module.css';

function ScrollOne({ children, ...props }) {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false); // Для предотвращения быстрого переключения

  const handleWheel = (e) => {
    e.preventDefault(); // Отключаем стандартное поведение

    if (isScrolling) return; // Блокируем повторные вызовы, пока идёт прокрутка

    const container = containerRef.current;
    const images = container.children;
    const totalImages = images.length;

    if (e.deltaY > 0 && currentIndex < totalImages - 1) {
      // Прокрутка вниз
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsScrolling(true); // Устанавливаем флаг прокрутки
    } else if (e.deltaY < 0 && currentIndex > 0) {
      // Прокрутка вверх
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setIsScrolling(true); // Устанавливаем флаг прокрутки
    }
  };

  useEffect(() => {
    const images = containerRef.current?.children;

    if (images[currentIndex]) {
      images[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }

    // Сбрасываем флаг через 500 мс (время для завершения анимации)
    const timeout = setTimeout(() => setIsScrolling(false), 500);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div
      className={classes.container2}
      ref={containerRef}
      onWheel={handleWheel}
    >
      <img src="/images/w1.png" alt="Image 1" />
      <img src="/images/b1.png" alt="Image 2" />
      <img src="/images/w2.png" alt="Image 3" />
      <img src="/images/b2.png" alt="Image 4" />
      <img src="/images/w3.png" alt="Image 5" />
    </div>
  );
}

export default ScrollOne;
