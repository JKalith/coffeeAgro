"use client";
import globals from "../../styles/globals.module.css";
import styles from "../../styles/salesDashboard/manageCategory.module.css";
import { useState, useEffect } from "react";
import stylesWindow from "../../ui/styles/popUpWindow.module.css";

export default function CreateCategory({ isOpen, onClose, initialCategory = null,onCategoryCreated }) {
  const [categoryName, setCategoryName] = useState('');

  const [status, setStatus] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (initialCategory) {
      setCategoryName(initialCategory.D_category_name || '');
      setStatus(initialCategory.B_status || true);
    } else {
      setCategoryName('');
      setStatus(true);
    }
  }, [initialCategory]);

  const handleClose = () => {
    setCategoryName('');
    setStatus(true);
    setMessage('');
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(initialCategory ? `/api/category/${initialCategory.C_category}` : "/api/category/", {  
        method: initialCategory ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          D_category_name: categoryName,
          B_status: status,
        }),
      });

      if (response.ok) {
        setCategoryName('');
        setStatus(true);
        onCategoryCreated(); 
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Nombre Categoria ya existente');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={stylesWindow.modalOverlay}>
      <div className={stylesWindow.modalContent}>
        <div className={styles.container}>
          <p className={globals.titles}>{initialCategory ? 'Editar Categoría' : 'Crear Nueva Categoría'}</p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <p className={styles.titleInput}>Nombre</p>
            <input
            className={styles.input}
              type="text"
             
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              maxLength={30} 
            />
            <div className={globals.containerButton}>
              <button className={globals.closeButton} type="button" onClick={handleClose}>Cerrar</button>
              <button className={globals.saveButton} type="submit" disabled={isSubmitting}>
                {isSubmitting ? (initialCategory ? 'Actualizando...' : 'Creando...') : (initialCategory ? 'Actualizar' : 'Registrar')}
              </button>
            </div>
          </form>
          {message && <p className={globals.errorMessage}>{message}</p>}
        </div>
      </div>
    </div>
  );
}
