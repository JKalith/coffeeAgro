"use client";
import React, { useState } from "react";
import Modal from "../../ui/popUpWindow/window";
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
    <div>
      <h1>Mi Aplicación</h1>

      <div>
        <div></div>
      </div>

      <Datam />

      <button onClick={openModal}>
        {" "}
        <div className={`${icon.containerIcon} ${icon.buyIcon}`}></div>
        Abrir Modal
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Este es el contenido del Modal</h2>
        <p>Puedes poner cualquier cosa aquí.</p>
        in
      
      </Modal>
    </div>
  );
};

export default home;
