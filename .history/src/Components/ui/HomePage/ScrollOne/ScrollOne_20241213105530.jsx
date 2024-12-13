import React, { useRef, useState } from 'react';
import classes from './HomePage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
function ScrollOne({ children, ...props }) {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleWheel = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение прокрутки

    const container = containerRef.current;
    const images = container.children;
    const totalImages = images.length;

    // Прокрутка вниз
    if (e.deltaY > 0 && currentIndex < totalImages - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }

    // Прокрутка вверх
    if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  React.useEffect(() => {
    const images = containerRef.current.children;

    if (images[currentIndex]) {
      images[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentIndex]);

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div
            className={classes.container2}
            ref={containerRef}
            onWheel={handleWheel}
          >
            <img src="/images/w1.png" alt="" />
            <img src="/images/b1.png" alt="" />
            <img src="/images/w2.png" alt="" />
            <img src="/images/b2.png" alt="" />
            <img src="/images/w3.png" alt="" />
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default ScrollOne;
