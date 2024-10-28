
import BtnSideNav from "../sideNav/btnSideNav"; // Asegúrate de que el nombre del componente esté con mayúscula
import styles from "../styles/sideNav.module.css";

export default function SideNav() {
  return (
    <div className={styles.container}>
      <div className={styles.containerSidebar}>
<div>


<p>Gestion de lotes </p>


</div>
  

        {/* Usa el componente BtnSideNav correctamente */}
        <BtnSideNav href="/plotDashboard/plotManagement" buttonText="Gestion de lotes" />
        <BtnSideNav href="/plotDashboard/productionHistory" buttonText="Historial de Produccion" />
    


      </div>
    </div>
  );
}
