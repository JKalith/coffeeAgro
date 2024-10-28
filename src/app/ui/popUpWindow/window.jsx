"use client";
import React from 'react';
import styles from "../styles/popUpWindow.module.css";
import icon from "../../ui/styles/icons.module.css";
const Modal = ({ isOpen, onClose, children , symbol}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
 
    {children}





        <button className={styles.closeButton}  onClick={onClose}>
        {" "}
        <div className={`${icon.containerIcon} ${symbol}`}></div>
   Cerrar
      </button>

        
  
      </div>
    </div>
  );
};

export default Modal;
