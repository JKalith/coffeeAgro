"use client";
import stylesDashboard from "../../styles/dashboard.module.css";

import { useState, useEffect } from "react";

export default function ManageProduct() {
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
    <div>
      <div className={stylesDashboard.displayTitle}>
        <div className={stylesDashboard.productRow}>
        <div className={stylesDashboard.cell}>
        <p>Producto</p>
        </div>
        <div className={stylesDashboard.cell}>
        <p>Precio Unitario</p>
        </div>
        <div className={stylesDashboard.cell}>
        <p>Categoria</p>
        </div>
        <div className={stylesDashboard.cell}>
        <p>Estado</p>
        </div>
        <div className={stylesDashboard.cell}>
        <p>Modificar</p>
        </div>
      </div>
      </div>
      <div className={stylesDashboard.containerRows}>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div key={product.C_product} className={stylesDashboard.productRow}>


                
              <div className={stylesDashboard.cell}>
                <p>{product.D_product_name}</p>
              </div>
              <div className={stylesDashboard.cell}>
                <p>{product.M_unit_price}</p>
              </div>
              <div className={stylesDashboard.cell}>
                <p>{product.Categories?.D_category_name}</p>
              </div>
              <div className={stylesDashboard.cell}>
                <p>{product.B_status ? "Activo" : "Inactivo"}</p>
              </div>
              <div className={stylesDashboard.cell}>
               

     
                <button>Modificar</button>
                               
          
              </div>
            </div>
          ))
        ) : (
          <p>No hay categorías disponibles.</p>
        )}
      </div>
    </div>
  );
}
