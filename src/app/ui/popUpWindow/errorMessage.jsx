import React from "react";
import styles from "../../ui/styles/popUpWindow.module.css";
import globals from "../../styles/globals.module.css";

const ErrorMessage = ({ message, onClose }) => {
  const handleClose = () => {
    onClose(); 
  };

  return (
    <div className={styles.modalOverlay}>

      <div className={`${styles.modalContent} `}>



        <div className={styles.errorContainer}>
          <p>{message}</p>
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
