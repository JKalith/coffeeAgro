import BtnSideNav from "../sideNav/btnSideNav"; // Asegúrate de que el nombre del componente esté con mayúscula
import styles from "../styles/sideNav.module.css";
import icon from "../styles/icons.module.css";
export default function SideNav() {
  return (
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
        />
        <BtnSideNav
          href="/salesDashboard/accountingClosing"
          buttonText="Cierre contable"
        />
        <BtnSideNav
          href="/salesDashboard/historyInvoice"
          buttonText="Historial de factura"
        />
        <BtnSideNav
          href="/salesDashboard/manageCategory"
          buttonText="Gestion de categoria"
        />
        <BtnSideNav
          href="/salesDashboard/manageProduct"
          buttonText="Gestion de producto"
        />
        <BtnSideNav
          href="/salesDashboard/productInventory"
          buttonText="Inventario de productos"
        />
      </div>
    </div>
  );
}
