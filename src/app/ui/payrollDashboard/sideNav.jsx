
import BtnSideNav from '../sideNav/btnSideNav'; // Asegúrate de que el nombre del componente esté con mayúscula
import styles from "../styles/sideNav.module.css";
import icons from '../../ui/styles/icons.module.css'
export default function SideNav() {
  return (
    <div className={styles.container}>
      <div className={styles.containerSidebar}>

   

        {/* Usa el componente BtnSideNav correctamente */}

        <BtnSideNav href="/payrollDashboard/registerPayroll" buttonText="Registro de planilla" icon={icons.buyIcon}/>
        <BtnSideNav href="/payrollDashboard/manageEmployee" buttonText="Gestion de empleados" icon={icons.buyIcon}/>
        <BtnSideNav href="/payrollDashboard/historyPayroll" buttonText="Historial de planillas"icon={icons.buyIcon}/>
      </div>
    </div>
  );
}
