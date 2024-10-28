
import BtnSideNav from "../sideNav/btnSideNav"; // Asegúrate de que el nombre del componente esté con mayúscula
import styles from "../styles/sideNav.module.css";
import icons from "../styles/icons.module.css"

export default function SideNav() {
  return (
    <div className={styles.container}>
      <div className={styles.containerSidebar}>

      <div className={styles.containerTitle}>
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
  );
}
