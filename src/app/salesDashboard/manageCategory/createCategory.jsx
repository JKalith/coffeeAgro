"use client";
import globals from "../../styles/globals.module.css";
import styles from "../../styles/salesDashboard/manageCategory.module.css";
import { useState } from "react";
import stylesWindow from "../../ui/styles/popUpWindow.module.css";
export default function CreateCategory({ isOpen, onClose }) {
  const [categoryName, setCategoryName] = useState('');
  const [status, setStatus] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const handleClose = () => {
    setFormData(initialFormState); // Limpia el formulario
    setMessage(""); // Limpia el mensaje
    onClose(); // Llama la función para cerrar la ventana emergente
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch("/api/category/", {  // Ruta corregida
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          D_category_name: categoryName,
          B_status: status,
        }),
      });
  
      if (response.ok) {
     
        onClose();  // Asegúrate de llamar a onClose para cerrar el modal
  
        setCategoryName('');  // Limpia el campo de nombre de categoría
        setStatus(true);  // Resetea el estado
      } else {
        const errorData = await response.json();
        setMessage(`Nombre de categoria ya existente`);
      }
    } catch (error) {
      
      setMessage(`Error: ${errorData.error}`);
    } finally {
      setIsSubmitting(false);
    }
  };
 // No renderizar si el modal no está abierto
 if (!isOpen) return null;
 


  return (
    <div className={stylesWindow.modalOverlay}>
        <div className={stylesWindow.modalContent}>
    <div className={styles.container}>
      <p className={globals.titles }>Crear Nueva Categoría</p>
      <form onSubmit={handleSubmit} className={styles.form}>
     <p className={styles.titleInput}>

      Nombre
     </p>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
       
        <label>
        <input type="hidden" value={status} />
        </label>

        <div className={globals.containerButton}>



        <button className={globals.closeButton}  onClick={handleClose}>Cerrar</button>
       
        <button   className={globals.saveButton} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creando...' : 'Registrar' }
        </button>


        </div>
      </form>
      {message && <p className={globals.errorMessage}>{message}</p>}
    </div>
 
    </div>
    </div>
  );
}