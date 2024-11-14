'use client'
import React, { useState, useEffect } from "react";
import globals from "../../styles/globals.module.css";
import stylesWindow from "../../ui/styles/popUpWindow.module.css";
import styles from "../../styles/salesDashboard/registerSale.module.css"
const ModalProduct = ({ onClose, onSelectProduct }) => {
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
        const activeProducts = data.filter((product) => product.B_status);
      setProducts(activeProducts);
  
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
        <div className={`${stylesWindow.modalContent}  ${styles.modalWidth} }`}>

          <p className={globals.titlePage}>Insertar producto</p>
        
          <div className={globals.displayTitle}>





            <div className={globals.productRow}>
              <div className={globals.cell}><p>ID</p></div>
              <div className={globals.cell}><p>Nombre</p></div>
            </div>
          </div>
          <div className={globals.scrollTable}>
          <div className={globals.containerRows}
          
          >
            {loading ? (
              <p>Cargando...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : products.length > 0 ? (
              products.map((product) => (
                <div 
                  key={product.C_product} 
                  className={`${globals.productRow} ${globals.hoverRows} ${globals.cursorPointer}`} 



     


                  onClick={() => onSelectProduct(product.C_product)}
                >
                  <div className={globals.cell}>
                    <p>{product.C_product}</p>
                  </div>
                  <div className={globals.cell}>
                    <p>{product.D_product_name}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay productos registrados.</p>
            )}

</div></div>
            <div className={globals.containerButton}>
              <button className={globals.closeButton} onClick={onClose}>
                Cerrar
              </button>
            </div>
         
            </div>
      </div>
    </div>
  );
};

export default ModalProduct;
