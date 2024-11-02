"use client";
import globals from "../../styles/globals.module.css";
import stylesWindow from "../../ui/styles/popUpWindow.module.css"; 
import styles from "../../styles/salesDashboard/manageCategory.module.css";
import { useState } from "react";
export default function ChangeStatusModal({ isOpen, onClose, category, categories = [], setCategories }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen || !category) {
    return null; 
  }

  const handleClose = () => {
    setMessage(''); 
    onClose(); 
  };

  const handleChangeStatus = async (newStatus) => {
    setIsSubmitting(true); 

    try {
      const response = await fetch(`/api/category/${category.C_category}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ B_status: newStatus }), 
      });

      if (response.ok) {
        
        const updatedCategories = categories.map(cat =>
          cat.C_category === category.C_category
            ? { ...cat, B_status: newStatus } 
            : cat
        );

        console.log("Categorías actualizadas:", updatedCategories); 

        setCategories(updatedCategories); 
        onClose(); 
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Error al cambiar el estado de la categoría');
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
        <div className={styles.container}>
          <p className={globals.titles}>Cambiar Estado de {category.D_category_name}</p>
          <p>¿Está seguro de que desea cambiar el estado a {!category.B_status ? 'Activo' : 'Inactivo'}?</p>
          <div className={globals.containerButton}>
            <button className={globals.closeButton} type="button" onClick={handleClose}>Cerrar</button>
            <button
              className={globals.saveButton}
              type="button"
              onClick={() => handleChangeStatus(!category.B_status)} 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Cambiando...' : (category.B_status ? 'Desactivar' : 'Activar')}
            </button>
          </div>
          {message && <p className={globals.errorMessage}>{message}</p>} 
        </div>
      </div>
    </div>
  );
}
