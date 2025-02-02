import { useState, useEffect, useRef } from 'react';

export const useWidth = (className) => {
  const [width, setWidth] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (elementRef.current) {
        setWidth(elementRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  useEffect(() => {
    elementRef.current = document.querySelector(`.${className}`);
    if (elementRef.current) {
      setWidth(elementRef.current.offsetWidth);
    }
  }, [className]);

  return width;
};
