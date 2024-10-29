"use client";
import stylesDashboard from "../../styles/dashboard.module.css";
import styles from "../../styles/salesDashboard/registerSale.module.css";
import { useState, useEffect } from "react";

export default function productInventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product/");
        if (!response.ok) {
          throw new Error("Error fetching product: " + response.statusText);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className={stylesDashboard.container}>
      
      <span>
        <p className={stylesDashboard.titlePage}>Productos</p>

        <div className={stylesDashboard.table}>
          <div className={stylesDashboard.displayTitle}>
            <p>Producto</p>
            <p>Cantidad en stock</p>
            <p>Precio Unitario</p>
            <button>Agregar stock</button>
          </div>
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.C_product}
                className={stylesDashboard.tableRow}
              >
                <p>{product.D_product_name}</p>
                <p>{product.Q_stock}</p>
                <p>{product.M_unit_price}</p>
                <button>Agregar stock</button>
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
  