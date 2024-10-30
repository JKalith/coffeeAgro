"use client";
import stylesDashboard from "../../styles/dashboard.module.css";
import stylesWindow from "../../ui/styles/popUpWindow.module.css";
import { useState, useEffect } from "react";
import styles from '../../styles/salesDashboard/registerSale.module.css'
const modalProduct = ({ onClose, onConfirm, selectedIds }) => {
  const [localSelectedIds, setLocalSelectedIds] = useState(selectedIds);

  useEffect(() => {
    setLocalSelectedIds(selectedIds); // Sincronizar cuando el modal se abre
  }, [selectedIds]);

  // Manejar la selección de checkboxes
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setLocalSelectedIds((prev) => [...prev, id]); // Agrega ID si está marcado
    } else {
      setLocalSelectedIds((prev) =>
        prev.filter((checkboxId) => checkboxId !== id)
      ); // Quita ID si no está marcado
    }
  };
  const handleConfirm = () => {
    onConfirm(localSelectedIds); // Pasar los IDs seleccionados al componente padre
  };

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
      <div className={stylesWindow.modalOverlay}>
        <div className={stylesWindow.modalContent}>
          <p className={stylesDashboard.titlePage}>Insertar producto</p>
          <div className={stylesDashboard.displayTitle}>
            <div className={stylesDashboard.productRow}>
              <div className={stylesDashboard.cell}>
                <p>Nombre</p>
              </div>
              <div className={stylesDashboard.cell}>
                <p>Seleccione producto</p>
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
                <div
                  key={product.C_product}
                  className={stylesDashboard.productRow}
                >
                  <div className={stylesDashboard.cell}>
                    <p>{product.D_product_name}</p>
                  </div>

                  <div className={stylesDashboard.cell}>
                    <input
                      type="checkbox"
                      id={`${product.C_product}`}
                      checked={localSelectedIds.includes(
                        `${product.C_product}`
                      )} // Mantener seleccionados
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No hay productos registrados.</p>
            )}

            <div className={styles.containerButton}>
            <button className={styles.button} onClick={onClose}>Cerrar</button>

            <button className={styles.button}onClick={handleConfirm}>Confirmar</button>


  

            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};
export default modalProduct;
