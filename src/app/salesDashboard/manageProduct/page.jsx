"use client";
import stylesDashboard from "../../styles/dashboard.module.css";
import React, { useState } from "react";
import Modal from "../../ui/popUpWindow/window";
import icon from "../../ui/styles/icons.module.css";

import CreateProduct from "../../salesDashboard/manageProduct/createProduct";

import TableProducts from "../../salesDashboard/manageProduct/tableProduct";
export default function manageProduct() {
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
        <p className={stylesDashboard.titlePage}>Gestion de producto</p>

        <div className={stylesDashboard.table}>
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
            <CreateProduct></CreateProduct>
            
          </Modal>
          <TableProducts></TableProducts>
        </div>
      </span>
    </div>
  );
}
