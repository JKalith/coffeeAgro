"use client";
import globals from "../../styles/globals.module.css";
import stylesWindow from "../../ui/styles/popUpWindow.module.css";
import AccountingJustificationConfirm from "../../salesDashboard/accountingClosing/accountingJustificationConfirm";
import { useState } from "react";
import styles from "../../styles/salesDashboard/accountingClosing.module.css"
export default function AccountingJustificationWindow({
  isOpen,
  onClose,
  listProduct,
  setListProduct, // Añadido para actualizar la lista en el componente padre
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setMessage("");
    onClose();
  };

  const handleRegisterJustification = async () => {
    setIsSubmitting(true);
    try {
        setIsConfirmModalOpen(true);
   
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJustificationChange = (productCode, value) => {
    setListProduct((prevList) =>
      prevList.map((product) =>
        product.code === productCode
          ? { ...product, justification: value }
          : product
      )
    );
  };

  return (
    <div className={stylesWindow.modalOverlay}>
      <div className={`${stylesWindow.modalContent} ${styles.container}`}>

        <p className=
        {globals.titlePage}>
          Procesar ajuste
        </p>
 
        <div className={globals.container}>
          <div className={globals.displayTitle}>
            <div className={globals.productRow}>
              <div className={globals.cell}>
                <p>Nombre</p>
              </div>
              <div className={globals.cell}>
                <p>Estado</p>
              </div>
              <div className={globals.cell}>
                <p>Cant. faltante/sobrante</p>
              </div>
              <div className={`${globals.cell} `}>
                <p>Justificación</p>
              </div>
            </div>
          </div>
          <div className={globals.scrollTable}>
            {listProduct.length > 0 ? (
              listProduct.map((item) => (
                <div key={item.code} className={globals.productRow}>
                  <div className={globals.cell}>
                    <p>{item.name}</p>
                  </div>
                  <div className={globals.cell}>
                    <p>{item.difference < 0 ? "Sobrante" : "Faltante"}</p>
                  </div>
                  <div className={globals.cell}>
                    <p>{item.difference < 0 ? item.difference*-1 : item.difference}</p>
                  </div>
                  <div className={`${globals.cell} ${globals.inputJustify}`}>
            
                    <input
                      type="text"
                   
                      placeholder="Justificación"
                      value={item.justification || ""}
                      onChange={(e) =>
                        handleJustificationChange(item.code, e.target.value)
                      }
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className={globals.errorMessage}>
                No hay productos con diferencias.
              </p>
            )}
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
              onClick={handleRegisterJustification}
              disabled={isSubmitting}
            >
              Registrar
            </button>
          </div>
          {message && <p className={globals.errorMessage}>{message}</p>}
        </div>
      </div>
      <AccountingJustificationConfirm
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        listProduct = {listProduct}
      />
    </div>
  );
}
