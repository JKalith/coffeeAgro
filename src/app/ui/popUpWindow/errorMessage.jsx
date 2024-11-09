// components/ErrorMessage.js
import React from "react";
import styles from "../../ui/styles/popUpWindow.module.css"; // Asegúrate de tener el archivo CSS

const ErrorMessage = ({ message }) => {
  return (
    <div className={styles.errorMessage}>
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
