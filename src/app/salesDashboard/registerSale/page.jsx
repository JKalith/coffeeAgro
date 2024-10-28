import stylesDashboard from "../../styles/dashboard.module.css";
import styles from '../../styles/salesDashboard/registerSale.module.css';
export default function registerSale() {
  return (
    <div className={stylesDashboard.container}>
      <span>



 
        <p className={stylesDashboard.titlePage}>Registrar venta</p>

        <div className={stylesDashboard.containerBetween}>
        <div className={stylesDashboard.flexInput}>
          <p>Cliente:</p>
          <input type="text" />
        </div>

        <div className={stylesDashboard.flexInput}>
          <p>Fecha:</p>
          <input type="date" />
        </div>


        </div>

        <div className={stylesDashboard.table}>
          <div className={stylesDashboard.displayTitle}>
            <p>cedula</p>
            <p>telefono</p>
            <p>hora</p>
          </div>
        </div>
      </span>
    </div>
  );
}
