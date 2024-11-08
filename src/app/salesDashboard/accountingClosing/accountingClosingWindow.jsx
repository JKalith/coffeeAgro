"use client";
import globals from "../../styles/globals.module.css";
import stylesWindow from "../../ui/styles/popUpWindow.module.css"; 
import { useState } from "react";

export default function AccountingClosingWindow({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen) {
    return null; 
  }

  const handleClose = () => {
    setMessage(''); 
    onClose(); 
  };

  const handleChangeStatus = async () => {
    setIsSubmitting(true); 
    try {
      const response = await fetch("/api/accountingClosingSales/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          B_status: true,
          B_inventory_adjustment: false,
          F_date: new Date(), 
        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al guardar el cierre contable.");
      }
  
      const data = await response.json();
      console.log(data.message); 
  
      setMessage("Cierre contable guardado con éxito.");
      
      // Recargar la página después de guardar exitosamente
      window.location.reload();

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
          <p className={globals.titles}>No hay faltante ni sobrante</p>
          <p>¿Desea finalizar el cierre contable?</p>
          <div className={globals.containerButton}>
            <button className={globals.closeButton} type="button" onClick={handleClose}>Cerrar</button>
            <button
              className={globals.saveButton}
              type="button"
              onClick={handleChangeStatus}
              disabled={isSubmitting}
            >
              Guardar Cierre Contable
            </button>
          </div>
          {message && <p className={globals.errorMessage}>{message}</p>} 
        </div>
      </div>
    </div>
  );
}
