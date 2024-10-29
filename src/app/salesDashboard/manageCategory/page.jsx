"use client";
import stylesDashboard from "../../styles/dashboard.module.css";

import CategoryTable from '../../salesDashboard/manageCategory/categoryTable'
export default function manageCategory() {
  return (
    <div className={stylesDashboard.container}>
      
      <span>
        <p className={stylesDashboard.titlePage}>Gestion de categorias</p>

        <div className={stylesDashboard.table}>
        <button>Registrar categorias</button>
       <CategoryTable></CategoryTable>
        </div>
      </span>
    </div>
  );
}
