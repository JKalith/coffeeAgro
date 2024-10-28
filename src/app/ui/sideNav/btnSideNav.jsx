"use client"; // Asegúrate de incluir esta línea al inicio
import React from 'react';
import { usePathname } from 'next/navigation'; 
import Link from 'next/link';
import styles from "../styles/sideNav.module.css"
const btnSideNav = ({ href, buttonText, icon}) => {
  const pathname = usePathname(); 
  const isActive = pathname.includes(href);
    return (
      <Link className={`${styles.labelContent} ${isActive ? styles.activeLabel:''}`} href={href}>
           <span  >

           <div className={`${styles.logoContainer} ${isActive ? styles.activeIcon: ''} ${icon}`} />










   
        </span  >
        <button className={styles.menuRow}>
          {buttonText}
        </button>
      </Link>
    );
  };
  
export default btnSideNav;









