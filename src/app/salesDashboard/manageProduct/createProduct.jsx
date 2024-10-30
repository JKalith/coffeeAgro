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
    <div>
      <div className={stylesDashboard.displayTitle}>
        <div className={stylesDashboard.productRow}>
          <div className={stylesDashboard.cell}>
            <p>Categoria</p>
          </div>
          <div className={stylesDashboard.cell}>
            <p>Estado</p>
          </div>
          <div className={stylesDashboard.cell}>
            <p>Modificar</p>
          </div>

          <div className={stylesDashboard.cell}>
            <p>Cambiar estado</p>
          </div>
        </div>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : categories.length > 0 ? (
        categories.map((category) => (
          <div key={category.C_category} className={stylesDashboard.productRow}>
            <div className={stylesDashboard.cell}>
              <p>{category.D_category_name}</p>
            </div>
            <div className={stylesDashboard.cell}>
              <p>{category.B_status ? "Activo" : "Inactivo"}</p>
            </div>

            <div className={stylesDashboard.cell}>
              <button>Modificar</button>
            </div>
            <div className={stylesDashboard.cell}>
              <button>Cambiar estado</button>
            </div>
          </div>
        ))
      ) : (
        <p>No hay categorías disponibles.</p>
      )}
    </div>
  );
}
