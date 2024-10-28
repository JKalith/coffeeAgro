"use client";
import React, { useState } from "react";
import Modal from "../../ui/popUpWindow/window";
import stylesDashboard from "../../styles/dashboard.module.css";
import Datam from "../(overview)/data";
import icon from "../../ui/styles/icons.module.css";
const home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={stylesDashboard.container}>
      <span>
        <h1>Mi Aplicación</h1>
        <div className={stylesDashboard.table}>
          <Datam />
          <button onClick={openModal}>
            {" "}
            <div className={`${icon.containerIcon} ${icon.buyIcon}`}></div>
            Ventana emergente
          </button>

          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            symbol={icon.closeIcon}
          >
            <div></div>
            <h2>Este es el contenido del Modal</h2>
            <p>Puedes poner cualquier cosa aquí.</p>
            in
          </Modal>
        </div>
      </span>
    </div>
  );
};

export default home;
