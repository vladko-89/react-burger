import React from 'react';
import styles from './Preloader.module.css';
import preloaderImg from '../../images/preloader/loading.png';

function Preloader() {
  return (
    <section className={`${styles.preloader}`}>
      <img className={`${styles.preloader__circle}`} src={preloaderImg} alt="Preloader" />
    </section>
  );
}

export default Preloader;
