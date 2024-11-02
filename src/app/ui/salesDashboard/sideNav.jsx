"use client";
import BtnSideNav from "../sideNav/btnSideNav"; // Asegúrate de que el nombre del componente esté con mayúscula
import styles from "../styles/sideNav.module.css";
import { useState } from "react";
import icon from "../styles/icons.module.css";
export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
 
       
       <button className={styles.menuBtn} onClick={toggleNav}>
        {isOpen ? "Close" : "Open"}
      </button>

      <div
        className={`${styles.sidenav}  ${
          isOpen ? styles.open : ""
        }`}
      >
           <div className={styles.container}>
      <div className={styles.containerSidebar}>
        <div className={styles.containerTitle}>
   


     
          <span className={icon.buyIcon}>
            <div className={icon.containerIcon}></div>
          </span>

         
          <p className={styles.titleDashboard}>Gestion de ventas </p>
  

        </div>

        {/* Usa el componente BtnSideNav correctamente */}
        <BtnSideNav
          href="/salesDashboard/registerSale"
          buttonText="Registro de venta"
          icon={icon.registerSaleIcon}
        />
        <BtnSideNav
          href="/salesDashboard/accountingClosing"
          buttonText="Cierre contable"
          icon={icon.accountingClosingIcon}
        />
        <BtnSideNav
          href="/salesDashboard/historyInvoice"
          buttonText="Historial de factura"
          icon={icon.historyInvoiceIcon}
        />
        <BtnSideNav
          href="/salesDashboard/manageCategory"
          buttonText="Gestion de categoria"
          icon={icon.categoryIcon}
        />
        <BtnSideNav
          href="/salesDashboard/manageProduct"
          buttonText="Gestion de producto"
          icon={icon.manageProductIcon   }
        />
        <BtnSideNav
          href="/salesDashboard/productInventory"
          buttonText="Inventario de productos"
          icon={icon.procductInventoryIcon}
        />
      </div>     </div>
    </div></div>
  );
}
