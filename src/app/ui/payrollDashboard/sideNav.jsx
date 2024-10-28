
import BtnSideNav from '../sideNav/btnSideNav'; // Asegúrate de que el nombre del componente esté con mayúscula
import styles from "../styles/sideNav.module.css";

export default function SideNav() {
  return (
    <div className={styles.container}>
      <div className={styles.containerSidebar}>

   

        {/* Usa el componente BtnSideNav correctamente */}

        <BtnSideNav href="/payrollDashboard/registerPayroll" buttonText="Registro de planilla" />
        <BtnSideNav href="/payrollDashboard/manageEmployee" buttonText="Gestion de empleados" />
        <BtnSideNav href="/payrollDashboard/historyPayroll" buttonText="Historial de planillas" />
      </div>
    </div>
  );
}
