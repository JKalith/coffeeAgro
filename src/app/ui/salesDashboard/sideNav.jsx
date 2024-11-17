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
      <button
        className={` ${isOpen ? styles.expandMenu : styles.collapseMenu}`}
        onClick={toggleNav}
      >
        <div
          className={`${icon.expandMenuIcon}  ${styles.iconClose}`}
        ></div>
      </button>
      <div className={`${styles.sidenav}  ${isOpen ? styles.open : ""}`}>
        <div className={styles.container}>
        <div className={styles.containerSidebar}>
   
        

            <button className={styles.menuBtn} onClick={toggleNav}>
              <div
                className={`${icon.collapseMenuIcon}  ${styles.iconOpen} `}
              ></div>
            </button>
            <div className={styles.containerTitle}>
              <span className={styles.containerIconTitle}>
                <span
                  className={`${icon.salesIcon}  ${styles.containerIcon}`}
                ></span>
              </span>

              <p className={styles.titleDashboard}>
                Gestion de <br />
                ventas{" "}
              </p>
            </div>

            {/* Usa el componente BtnSideNav correctamente */}
            <BtnSideNav
              href="/salesDashboard/registerSale"
              buttonText="Registro de venta"
              icon={icon.registerSaleIcon}
            />
            <BtnSideNav
              href="/salesDashboard/historyInvoice"
              buttonText="Historial de factura"
              icon={icon.historyInvoiceIcon}
            />
            <BtnSideNav
              href="/salesDashboard/accountingClosing"
              buttonText="Cierre contable"
              icon={icon.accountingClosingIcon}
            />

            <BtnSideNav
              href="/salesDashboard/historyAccountingC"
              buttonText="Historial de cierre contable"
              icon={icon.historyAccountingClosingIcon}
            />

            <BtnSideNav
              href="/salesDashboard/manageProduct"
              buttonText="Gestion de producto"
              icon={icon.manageProductIcon}
            />
            <BtnSideNav
              href="/salesDashboard/productInventory"
              buttonText="Inventario de productos"
              icon={icon.procductInventoryIcon}
            />
            <BtnSideNav
              href="/salesDashboard/manageCategory"
              buttonText="Gestion de categoria"
              icon={icon.categoryIcon}
            />
          </div>
        </div>
      </div></div>

  );
}
