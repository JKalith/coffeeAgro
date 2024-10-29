"use client";
import stylesDashboard from "../../styles/dashboard.module.css";

import TableProducts from '../../salesDashboard/manageProduct/tableProduct'
export default function manageProduct() {
  return (
    <div className={stylesDashboard.container}>
      
      <span>
        <p className={stylesDashboard.titlePage}>Gestion de producto</p>

        <div className={stylesDashboard.table}>
        <button>Registrar producto</button>
       <TableProducts></TableProducts>
        </div>
      </span>
    </div>
  );
}
