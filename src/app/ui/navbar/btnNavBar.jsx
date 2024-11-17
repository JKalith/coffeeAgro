
"use client"; // Asegúrate de incluir esta línea al inicio

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Correcto
import styles from "../styles/navBar.module.css";

const BtnNavBar = ({ href, buttonText, icon }) => {
    const pathname = usePathname(); // Obtiene la ruta actual

    // Cambiado de router.pathname a pathname
    const isActive = pathname.includes(href); // Cambiado a includes()

    return (
      <Link className={`${styles.labelContent} ${isActive ? styles.activeLabel:''}`} href={href}>
   <div className={`${styles.logoContainer} ${isActive ? styles.activeIcon: ''} ${icon}`} />

 

      <button className={styles.menuRow}>

      {buttonText}
    
      </button>

  </Link>
    );
  };
  
export default BtnNavBar;






