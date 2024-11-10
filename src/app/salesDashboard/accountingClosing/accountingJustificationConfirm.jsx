"use client";
import globals from "../../styles/globals.module.css";
import stylesWindow from "../../ui/styles/popUpWindow.module.css";
import { useState } from "react";

export default function AccountingClosingWindow({
  isOpen,
  onClose,
  listProduct,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isInventorySyncChecked, setIsInventorySyncChecked] = useState(true); // Estado para el checkbox

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setMessage("");
    onClose();
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/accountingClosingSales/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          B_status: true,
          B_inventory_adjustment: isInventorySyncChecked,
          F_date: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el cierre contable.");
      }

      const data = await response.json();

      await Promise.all(
        listProduct.map((product) =>
          fetch("/api/detailsAccountingSales/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              C_product: product.code,
              C_accounting_closing: data.C_accounting_closing,
              Q_system_quantity: product.systemQuantity,
              Q_physical_quantity: product.physicalQuantity,
              Q_subtraction: product.difference,
              D_justification: product.justification,
            }),
          })
        )
      );

      setMessage("Cierre contable guardado con éxito.");
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

       
          <p className={globals.titles}>¿Desea finalizar el cierre contable?</p>


          <div className={globals.flexInput}>

          <input
        type="checkbox"
        className={globals.checkbox} // Aplica clase CSS global
        checked={isInventorySyncChecked}
        onChange={(e) => setIsInventorySyncChecked(e.target.checked)}
      />
      <p className={globals.checkboxLabel}>
      Sincronizar el inventario del sistema con las existencias físicas
      </p>
          </div>
   




         
          <div className={globals.containerButton}>
            <button
              className={globals.closeButton}
              type="button"
              onClick={handleClose}
            >
              Cerrar
            </button>
            <button
              className={globals.saveButton}
              type="button"
              onClick={handleConfirm}
              disabled={isSubmitting}
            >
              Confirmar
            </button>
          </div>
          {message && <p className={globals.errorMessage}>{message}</p>}
        </div>
      </div>
    </div>
  );
}
