"use client";
import stylesDashboard from "../../styles/dashboard.module.css";
import styles from "../../styles/salesDashboard/registerSale.module.css";
import { useState, useEffect } from "react";

export default function manageCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category/");
        if (!response.ok) {
          throw new Error("Error fetching categories: " + response.statusText);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className={stylesDashboard.container}>
      <span>
        <p className={stylesDashboard.titlePage}>Categorias</p>

        <div className={stylesDashboard.table}>
          <button>Registrar Categoria</button>
          <div className={stylesDashboard.displayTitle}>
            <p>Categoria</p>
            <p>Estado</p>
            <p>Modificar</p>
            <p>Cambiar estado</p>
          </div>
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category.C_category}
                className={stylesDashboard.tableRow}
              >
                <p>{category.D_category_name}</p>
                <p>{category.B_status ? "Activo" : "Inactivo"}</p>
                <button>Modificar</button>
                <button>Cambiar estado</button>
              </div>
            ))
          ) : (
            <p>No hay categorías disponibles.</p>
          )}
        </div>
      </span>
    </div>
  );
}
