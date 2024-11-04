"use client";
import { useState, useEffect } from "react";
import stylesWindow from "../../ui/styles/popUpWindow.module.css";
import globals from "../../styles/globals.module.css";
import styles from '../../styles/salesDashboard/inventoryProducts.module.css'
export default function AddStock({ isOpen, onClose, product }) {
  const [additionalStock, setAdditionalStock] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setAdditionalStock(""); // Reset stock input when modal opens
      setMessage(""); // Reset any messages
    }
  }, [isOpen]);

  const handleClose = () => {
    setAdditionalStock("");
    setMessage("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newStock = product.Q_stock + parseInt(additionalStock, 10); // Calculate new stock

      const response = await fetch(`/api/product/${product.C_product}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Q_stock: newStock }),
      });

      if (response.ok) {
        onClose();
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Error updating stock");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className={stylesWindow.modalOverlay}>
      <div className={styles.containerAddStock}>
 
        <form onSubmit={handleSubmit} className={stylesWindow.form}>

 
      
        <p className={styles.titleModal}>Ingreso de productos</p>
        <p className={globals.titleInput}>Nombre de producto</p>
   
        <div className={styles.containerText}>
   

        <p >{product.D_product_name}</p>

        </div>





          <p className={globals.titleInput}>Stock</p>
          <input
            type="number"
            min="1"
            className={styles.containerText}
            value={additionalStock}
            onChange={(e) => setAdditionalStock(e.target.value)}
            required
          />
          <div className={globals.containerButton}>
            <button type="button" onClick={handleClose} className={globals.closeButton}>
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting} className={globals.saveButton}>
              {isSubmitting ? "Registrando..." : "Registrar"}
            </button>
          </div>
          {message && <p className={globals.errorMessage}>{message}</p>}
        </form>
      </div>
    </div>
  );
}