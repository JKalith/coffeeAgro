"use client";
import globals from "../../styles/globals.module.css";
import stylesWindow from "../../ui/styles/popUpWindow.module.css"; 
import styles from "../../styles/salesDashboard/manageCategory.module.css";
import { useState } from "react";
export default function ChangeProductStatusModal({ isOpen, onClose, product, products = [], setProducts }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen || !product) {
    return null; 
  }

  const handleClose = () => {
    setMessage(''); 
    onClose(); 
  };

  const handleChangeStatus = async (newStatus) => {
    setIsSubmitting(true); 

    try {
      const response = await fetch(`/api/product/${product.C_product}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ B_status: newStatus }), 
      });

      if (response.ok) {
        const updatedProducts = products.map(prod =>
          prod.C_product === product.C_product
            ? { ...prod, B_status: newStatus } 
            : prod
        );

        console.log("Productos actualizados:", updatedProducts); 

        setProducts(updatedProducts); 
        onClose(); 
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Error al cambiar el estado del producto');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className={stylesWindow.modalOverlay}>
      <div className={stylesWindow.modalContent}>
        <div className={globals.container}>
          <p className={globals.titles}>Cambiar Estado de {product.D_product_name}</p>
          <p>¿Está seguro de que desea cambiar el estado a {!product.B_status ? 'Activo' : 'Inactivo'}?</p>
          <div className={globals.containerButton}>
            <button className={globals.closeButton} type="button" onClick={handleClose}>Cerrar</button>
            <button
              className={globals.saveButton}
              type="button"
              onClick={() => handleChangeStatus(!product.B_status)} 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Cambiando...' : (product.B_status ? 'Desactivar' : 'Activar')}
            </button>
          </div>
          {message && <p className={globals.errorMessage}>{message}</p>} 
        </div>
      </div>
    </div>
  );
}