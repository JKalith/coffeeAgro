"use client";
import globals from "../../styles/globals.module.css";
import icon from "../../ui/styles/icons.module.css";
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
      <div className={globals.displayTitle}>
        <div className={globals.productRow}>
          <div className={globals.cell}>
            <p>Producto</p>
          </div>
          <div className={globals.cell}>
            <p>Precio Unitario</p>
          </div>
          <div className={globals.cell}>
            <p>Categoria</p>
          </div>
          <div className={globals.cell}>
            <p>Estado</p>
          </div>
          <div className={globals.cell}>Cambiar estado</div>
          <div className={globals.cell}>
            <p>Modificar</p>
          </div>
        </div>
      </div>
      <div className={globals.scrollTable}>
      <div className={globals.containerRows}>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div key={product.C_product} className={globals.productRow}>
              <div className={globals.cell}>
                <p>{product.D_product_name}</p>
              </div>
              <div className={globals.cell}>
                <p>{product.M_unit_price}</p>
              </div>
              <div className={globals.cell}>
                <p>{product.Categories?.D_category_name}</p>
              </div>
              <div className={globals.cell}>
                <p>{product.B_status ? "Activo" : "Inactivo"}</p>
              </div>

              <div className={globals.cell}>
                <button className={globals.changeButton}>
                  <div
                    className={`${icon.containerIcon} ${icon.changeIcon}`}
                  ></div>
                  Cambiar
                </button>
              </div>
              <div className={globals.cell}>
                <button className={globals.modifyButton}>
                  <div
                    className={`${icon.containerIcon} ${icon.modifyIcon}`}
                  ></div>
                  modificar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay categorías disponibles.</p>
        )}
      </div>
    </div>  </div>
  );
}
