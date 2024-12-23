import React, { useRef, useState, useEffect } from 'react';
import classes from './ScrollOne.module.css';

function ScrollOne() {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleWheel = (e) => {
    e.preventDefault();

    if (isAnimating) return; // Блокируем скролл, пока идёт анимация

    const container = containerRef.current;
    const totalImages = container.children.length;

    if (e.deltaY > 50 && currentIndex < totalImages - 1) {
      // Скролл вниз (добавлен порог deltaY > 50 для устранения чувствительности)
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsAnimating(true);
    } else if (e.deltaY < -50 && currentIndex > 0) {
      // Скролл вверх (добавлен порог deltaY < -50 для устранения чувствительности)
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setIsAnimating(true);
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const targetImage = container.children[currentIndex];
      if (targetImage) {
        targetImage.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }

    // Сбрасываем блокировку через 600 мс (длительность анимации)
    const timeout = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  // Сбрасываем прокрутку на начальную позицию при загрузке компонента
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    }
  }, []);

  return (
    <>
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
    <div className={classes.container}
    </>
  );
}

export default ScrollOne;
