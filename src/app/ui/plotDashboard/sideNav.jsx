
import BtnSideNav from "../sideNav/btnSideNav"; // Asegúrate de que el nombre del componente esté con mayúscula
import styles from "../styles/sideNav.module.css";
import icon from '../../ui/styles/icons.module.css'
export default function SideNav() {
  return (
    <div className={styles.container}>
      <div className={styles.containerSidebar}>
<div>


<div className={styles.containerTitle}>
            
            <span className={styles.containerIconTitle}>
              <span
                className={`${icon.salesIcon}  ${styles.containerIcon}`}
              ></span>
            </span>

            <p className={styles.titleDashboard}>Gestion de <br />lotes </p>
          </div>


</div>
  

        {/* Usa el componente BtnSideNav correctamente */}
        <BtnSideNav href="/plotDashboard/plotManagement" buttonText="Gestion de lotes" />
        <BtnSideNav href="/plotDashboard/productionHistory" buttonText="Historial de Produccion" />
    


      </div>
    </div>
  );
}
