import React from "react";
import styles from "../../ui/styles/popUpWindow.module.css";
import globals from "../../styles/globals.module.css";

const ErrorMessage = ({ message, onClose }) => {
  const handleClose = () => {
    onClose(); // Cierra el modal llamando a la función pasada como prop
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} `}>
        <div className={styles.errorContainer}>
          <span>{message}</span>
          <span className={globals.containerButton}>
            <button
              className={globals.closeButton}
              type="button"
              onClick={handleClose}
            >
              Cerrar
            </button>
          </span>
        </div>
      </div>{" "}
    </div>
  );
};

export default ErrorMessage;
