'use client'
import React, { useState } from 'react';
import styles from "../styles/navBar.module.css"
import Link from 'next/link';
import icons from "../styles/icons.module.css"
import BtnNavBar from "./btnNavBar"
import icon from '../styles/icons.module.css'


import globals from '../../styles/globals.module.css'
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const toggleMenu = () => {
    if (menuOpen) {
      // Activar animación de cierre
      setClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setClosing(false);
      }, 1000); // Duración de la animación de cierre
    } else {
      setMenuOpen(true);
    }
  };






  return (
<nav className={styles.navbar}>
  <div className={styles.logo}>CoffeeAgro</div>



  
  <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
  
    <li>  <BtnNavBar href="/buyDashboard" buttonText="Compras" icon={icons.buyIcon} /> </li>
    <li> <BtnNavBar href="/salesDashboard" buttonText="Ventas" icon={icons.salesIcon } /></li>
    <li> <BtnNavBar href="/plotDashboard" buttonText="Lotes" icon={icons.loteIcon} /></li>
    <li> <BtnNavBar href="/payrollDashboard" buttonText="Planilla" icon={icons.payrollIcon} /></li>
  </ul>


  <div className={styles.hideDropdown}>




      <button className={globals.button} onClick={toggleMenu}>
            <div className={`${icon.containerIcon} ${icon.addProductIcon}`}></div>

          </button>





      {(menuOpen || closing) && (
         <ul 
          className={`${styles.dropdownMenu} ${
            closing ? styles.closing : styles.opening
          }`}
        >

      
    <li>  <BtnNavBar href="/buyDashboard" buttonText="Compras" icon={icons.buyIcon} /> </li>
    <li> <BtnNavBar href="/salesDashboard" buttonText="Ventas" icon={icons.salesIcon } /></li>
    <li> <BtnNavBar href="/plotDashboard" buttonText="Lotes" icon={icons.loteIcon} /></li>
    <li> <BtnNavBar href="/payrollDashboard" buttonText="Planilla" icon={icons.payrollIcon} /></li>


    </ul>
      )}

          
  </div>
</nav>

  );
};

export default Navbar;








