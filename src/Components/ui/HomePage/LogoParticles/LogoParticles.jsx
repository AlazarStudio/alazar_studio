import React, { useEffect, useRef } from 'react';
import classes from './LogoParticles.module.css';

export default function LogoParticles({ scaleX = 1, scaleY = 1 }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]); // Хранение частиц
  const mouse = useRef({ x: null, y: null, radius: 70 }); // Хранение координат мыши
  const loadedImagesRef = useRef([]); // Хранение загруженных изображений

  // Список изображений, которые используются для генерации частиц
  const images = [
    {
      src: '/images/logoA.png',
      width: 220 * scaleX,
      height: 180 * scaleY,
      offsetY: 190,
      offsetX: 0,
      name: 'logoA',
    },
    {
      src: '/images/logoAlazar.png',
      width: 480 * scaleX,
      height: 70 * scaleY,
      offsetY: 490,
      offsetX: -260,
    },
    {
      src: '/images/logoStudio.png',
      width: 460 * scaleX,
      height: 70 * scaleY,
      offsetY: 490,
      offsetX: 260,
    },
  ];

  // Функция для генерации частиц
  const generateParticles = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; // Устанавливаем ширину холста
    canvas.height = window.innerHeight; // Устанавливаем высоту холста

    let particles = [];

    // Загружаем изображения и получаем данные для каждой частицы
    loadedImagesRef.current.forEach(
      ({ image, width, height, offsetY, offsetX, name }) => {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(image, 0, 0, width, height);
        const data = tempCtx.getImageData(0, 0, width, height).data;

        const offsetXFinal =
          canvas.width / 2 - width / 2 + (offsetX || 0) * scaleX;

        // Проходим по пикселям изображения и создаем частицы
        for (let y = 1; y < height; y += 6) {
          for (let x = 1; x < width; x += 6) {
            const index = (y * width + x) * 4;
            if (data[index + 3] > 128) {
              const isBottomRight =
                name === 'logoA' && x > width * 0.68 && y > height * 0.75;
              const color = isBottomRight ? '#e5097f' : '#ffffff';

              // Создаем частицу и добавляем её в массив
              particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                destX: x + offsetXFinal,
                destY: y + offsetY,
                vx: 0,
                vy: 0,
                // size: Math.random() * 3 + 1, // Размер частиц
                size: 3, // Размер частиц
                color,
              });
            }
          }
        }
      }
    );

    // Сохраняем все частицы в ref
    particlesRef.current = particles;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Загружаем изображения
    Promise.all(
      images.map(
        (img) =>
          new Promise((resolve) => {
            const image = new Image();
            image.src = img.src;
            image.onload = () => resolve({ ...img, image });
          })
      )
    ).then((loadedImages) => {
      loadedImagesRef.current = loadedImages; // Сохраняем изображения в ref
      generateParticles(); // Генерируем частицы
      animate(); // Запускаем анимацию
    });

    const handleMouseMove = (e) => {
      const bounds = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= bounds.left &&
        e.clientX <= bounds.right &&
        e.clientY >= bounds.top &&
        e.clientY <= bounds.bottom;

      if (inside) {
        mouse.current.x = e.clientX - bounds.left;
        mouse.current.y = e.clientY - bounds.top;
      } else {
        mouse.current.x = null;
        mouse.current.y = null;
      }
    };

    const handleResize = () => {
      generateParticles(); // Пересоздаем частицы при изменении размера экрана
    };

    // Слушаем события мыши и изменения размера окна
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем холст

      // Анимация частиц
      for (let p of particlesRef.current) {
        const dx = p.destX - p.x;
        const dy = p.destY - p.y;
        p.vx += dx * 0.005; // Ускорение по оси X
        p.vy += dy * 0.005; // Ускорение по оси Y

        // Реакция на мышь
        if (mouse.current.x !== null && mouse.current.y !== null) {
          const dist = Math.hypot(mouse.current.x - p.x, mouse.current.y - p.y);
          if (dist < mouse.current.radius) {
            const angle = Math.atan2(
              p.y - mouse.current.y,
              p.x - mouse.current.x
            );
            const force = (mouse.current.radius - dist) * 5.2;
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;
          }
        }

        // Замедление частиц
        p.vx *= 0.79;
        p.vy *= 0.79;
        p.x += p.vx;
        p.y += p.vy;

        // Отображаем частицу
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size); // Используем размер для частиц
      }

      // Запуск анимации
      animationRef.current = requestAnimationFrame(animate);
    };

    return () => {
      cancelAnimationFrame(animationRef.current); // Очищаем анимацию при размонтировании
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [scaleX, scaleY]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none', // Скрыть курсор
      }}
    />
  );
}
