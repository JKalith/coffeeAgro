"use client";
import globals from "../../styles/globals.module.css";
import stylesWindow from "../../ui/styles/popUpWindow.module.css";
import { useState } from "react";

export default function CancelInvoiceModal({
  isOpen,
  onClose,
  invoiceId,
  onCancelConfirm,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  if (!isOpen || !invoiceId) {
    return null;
  }

  const handleClose = () => {
    setMessage("");
    onClose();
  };

  const handleCancelInvoice = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/sale/${invoiceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setMessage("Factura anulada correctamente.");
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
          <p className={globals.titles}>Anular Factura #{invoiceId}</p>
          <p>¿Está seguro de que desea anular esta factura?</p>
          {message && <p className={globals.errorMessage}>{message}</p>}
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
              onClick={handleCancelInvoice}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Anulando..." : "Confirmar Anulación"}
            </button>
          </div>
   
        </div>
      </div>
    </div>
  );
}
