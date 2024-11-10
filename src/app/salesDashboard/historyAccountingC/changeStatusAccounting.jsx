"use client";
import globals from "../../styles/globals.module.css";
import stylesWindow from "../../ui/styles/popUpWindow.module.css";
import { useState } from "react";

export default function RevertAccountingModal({
  isOpen,
  onClose,
  AccountingId,
  onCancelConfirm,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  if (!isOpen || !AccountingId) {
    return null;
  }

  const handleClose = () => {
    setMessage("");
    onClose();
  };

  const handleRevertAccounting = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/accountingClosingSales/${AccountingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setMessage("Ciere contable revertido correctamente");
        onCancelConfirm();
        onClose();
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Error al anular la factura");
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
          <p className={globals.titles}>¿Seguro que desea revertir este cierre contable?</p>
          <p className={globals.marginleft}>No podra revertir esta acción</p>
          <div className={globals.containerButton}>
            <button
              className={globals.closeButton}
              type="button"
              onClick={handleClose}
            >


              Cancelar
            </button>




       





            <button
              className={globals.saveButton}
              type="button"
              onClick={handleRevertAccounting}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Revertiendo..." : "Revertir cierre"}
            </button>




          











          </div>
          {message && <p className={globals.errorMessage}>{message}</p>}
        </div>
      </div>
    </div>
  );
}
