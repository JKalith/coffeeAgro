
import BtnSideNav from '../sideNav/btnSideNav'; // Asegúrate de que el nombre del componente esté con mayúscula
import styles from "../styles/sideNav.module.css";
import icon from '../../ui/styles/icons.module.css'
export default function SideNav() {
  return (
    <div className={styles.container}>
      <div className={styles.containerSidebar}>

      <div className={styles.containerTitle}>
            
            <span className={styles.containerIconTitle}>
              <span
                className={`${icon.payrollIcon}  ${styles.containerIcon}`}
              ></span>
            </span>

            <p className={styles.titleDashboard}>Gestion de <br />planilla </p>
          </div>

        {/* Usa el componente BtnSideNav correctamente */}

        <BtnSideNav href="/payrollDashboard/registerPayroll" buttonText="Registro de planilla" icon={icon.buyIcon}/>
        <BtnSideNav href="/payrollDashboard/manageEmployee" buttonText="Gestion de empleados" icon={icon.buyIcon}/>
        <BtnSideNav href="/payrollDashboard/historyPayroll" buttonText="Historial de planillas"icon={icon.buyIcon}/>
      </div>
    </div>
  );
}
