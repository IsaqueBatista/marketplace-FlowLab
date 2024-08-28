import React, { useState, useRef, useEffect } from 'react';
import styles from "./PriceFilter.module.css";

export default function PriceFilter() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const rangeRef = useRef(null);

  const handlePriceChange = (event) => {
    const { clientX } = event;
    const { left, width } = rangeRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max((clientX - left) / width, 0), 1);
    const value = Math.round(percent * 100);

    if (Math.abs(value - minPrice) < Math.abs(value - maxPrice)) {
      setMinPrice(Math.min(value, maxPrice - 1));
    } else {
      setMaxPrice(Math.max(value, minPrice + 1));
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handlePriceChange);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    rangeRef.current.addEventListener('mousedown', (event) => {
      handlePriceChange(event);
      document.addEventListener('mousemove', handlePriceChange);
      document.addEventListener('mouseup', handleMouseUp);
    });

    return () => {
      document.removeEventListener('mousemove', handlePriceChange);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const minThumbStyle = { left: `${minPrice}%` };
  const maxThumbStyle = { left: `${maxPrice}%` };
  const rangeStyle = { left: `${minPrice}%`, width: `${maxPrice - minPrice}%` };

  return (
    <div className={styles.priceFilter}>
      <h1 className={styles.title}>Preço</h1>
      <div className={styles.rangeSlider} ref={rangeRef}>
        <div className={styles.rangeTrack}></div>
        <div className={styles.rangeSelected} style={rangeStyle}></div>
        <div className={`${styles.rangeThumb} ${styles.rangeThumbMin}`} style={minThumbStyle}></div>
        <div className={`${styles.rangeThumb} ${styles.rangeThumbMax}`} style={maxThumbStyle}></div>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>Mínimo</button>
        <button className={styles.button}>Máximo</button>
      </div>
    </div>
  );
}