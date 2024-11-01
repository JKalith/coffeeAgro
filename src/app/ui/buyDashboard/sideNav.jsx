

'use client'

import BtnSideNav from "../sideNav/btnSideNav"; // Asegúrate de que el nombre del componente esté con mayúscula
import styles from "../../styles/sideNav.module.css";
import icons from "../styles/icons.module.css"

import { useState } from 'react';

  const SideNav = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleNav = () => {
      setIsOpen(!isOpen);
    };
  return (
    <div >
  <button className={styles.menuBtn} onClick={toggleNav}>
        {isOpen ? 'Close' : 'Open'}
      </button>


    <div className={`${styles.sidenav} ${styles.container} ${isOpen ? styles.open : ''}`}>
      <div className={styles.containerSidebar}>
    
      <div className={styles.containerTitle}>
      <button className={styles.menuBtn} onClick={toggleNav}>
        {isOpen ? 'Close' : 'Open'}
      </button>
          <p>
            gestion de compras
          </p>
         </div>

        {/* Usa el componente BtnSideNav correctamente */}
        <BtnSideNav href="/buyDashboard/accoutingClosing" buttonText="Crear cierre contable" />
        <BtnSideNav href="/buyDashboard/createInvoice" buttonText="Crear Factura" icon={icons.loteIcon}/>
        <BtnSideNav href="/buyDashboard/historyAccouting" buttonText="Historial de cierre contable" />
        <BtnSideNav href="/buyDashboard/historyInvoice" buttonText="historial de factura" />
        <BtnSideNav href="/buyDashboard/manageCategory" buttonText="Gestion de categorias" />
        <BtnSideNav href="/buyDashboard/manageInventory" buttonText="Gestion de inventario" />
      </div>
    </div>
          </div>
  );}
  export default SideNav;
