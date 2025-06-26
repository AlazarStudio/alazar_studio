import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { useLocation } from 'react-router-dom';

export function useLenisScroll() {
  const location = useLocation();
  const lenisRef = useRef(null);

  // Инициализация Lenis один раз
  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 0.5, // Плавная но быстрая
      easing: (t) => t, // линейная
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 1.4,
      wheelMultiplier: 0.5, // шаг чуть меньше
      gestureOrientation: 'vertical',
      direction: 'vertical',
      autoResize: true,
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Скроллим вверх при переходе (если нужно)
  // useEffect(() => {
  //   const lenis = lenisRef.current;
  //   if (!lenis) return;

  //   const scrollToTop = () => {
  //     lenis.scrollTo(0, { immediate: false });
  //   };

  //   const timeout = setTimeout(scrollToTop, 200);
  //   return () => clearTimeout(timeout);
  // }, [location.pathname]);
}
