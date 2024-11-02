"use client";

import globals from "../../styles/globals.module.css";
import { useState } from "react";
import TableProduct from "../../salesDashboard/manageProduct/tableProduct";
import CreateProduct from "../../salesDashboard/manageProduct/createProduct";
import icon from "../../ui/styles/icons.module.css";

export default function ManageProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false); 

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  
  const handleProductCreated = () => {
    setRefresh((prev) => !prev); 
    closeModal(); 
  };

  return (
    <div className={globals.container}>
      <span>
        <p className={globals.titlePage}>Gestión de Productos</p>

        <div className={globals.table}>
          <button onClick={openModal} className={globals.registerButton}>
            <div className={`${icon.containerIcon} ${icon.addProductIcon}`}></div>
            Registrar Producto
          </button>

          <CreateProduct
            isOpen={isModalOpen}
            onClose={closeModal}
            onProductCreated={handleProductCreated}
          />

         
          <TableProduct refresh={refresh} />
        </div>
      </span>
    </div>
  );
}
