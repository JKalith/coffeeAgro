import React from 'react';
import styles from '../../ui/styles/loadingScreen.module.css'

const LoadingScreen = () => {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loader}></div>
      <p>Cargando...</p>
    </div>
  );
};

export default LoadingScreen;
