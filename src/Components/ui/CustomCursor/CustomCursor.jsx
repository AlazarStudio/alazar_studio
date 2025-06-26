import React, { useEffect, useRef, useState } from 'react';
import classes from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorColor, setCursorColor] = useState('#e5097f');

  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor-hover]');
      if (target) {
        setIsHovered(true);
        setCursorText(target.getAttribute('data-cursor-text') || '');
        setCursorColor(target.getAttribute('data-cursor-color') || '#e5097f');
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('[data-cursor-hover]')) {
        setIsHovered(false);
        setCursorText('');
        setCursorColor('#e5097f');
      }
    };

    const animate = () => {
      const lerp = (a, b, n) => a + (b - a) * n;

      cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.07);
      cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.07);

      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorPos.current.x}px`;
        cursorRef.current.style.top = `${cursorPos.current.y}px`;
      }

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    animate(); // запускаем анимацию

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`${classes.customCursor} ${isHovered ? classes.hovered : ''}`}
      style={{ backgroundColor: isHovered ? cursorColor : '#e5097f' }}
    >
      {isHovered && <span className={classes.cursorText}>{cursorText}</span>}
    </div>
  );
}
