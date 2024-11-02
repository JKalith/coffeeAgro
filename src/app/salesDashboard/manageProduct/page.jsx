"use client";

import stylesDashboard from "../../styles/globals.module.css";
import React, { useState } from "react";
import CreateProduct from "../../salesDashboard/manageProduct/createProduct";
import TableProducts from "../../salesDashboard/manageProduct/tableProduct";
import icon from "../../ui/styles/icons.module.css";

export default function ManageProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);

  };
  const handleProductCreated = () => {
    closeModal();
    window.location.reload();
  };
  return (
    <div className={stylesDashboard.container}>
      <span>
        <p className={stylesDashboard.titlePage}>Gestión de producto</p>

        <div className={stylesDashboard.table}>
          <button onClick={openModal}>
            <div className={`${icon.containerIcon} ${icon.addProductIcon}`}></div>
           Registrar producto
          </button>

          <CreateProduct isOpen={isModalOpen} onClose={closeModal} onProductCreated={handleProductCreated}/>
          

          <TableProducts />
        </div>
      </span>
    </div>
  );
}
