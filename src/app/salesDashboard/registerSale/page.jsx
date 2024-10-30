"use client";
import stylesDashboard from "../../styles/dashboard.module.css";
import styles from "../../styles/salesDashboard/registerSale.module.css";

import icon from "../../ui/styles/icons.module.css";
import ModalProduct from "../registerSale/modalProduct";
import React, { useState } from "react";
export default function registerSale() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCheckboxIds, setSelectedCheckboxIds] = useState([]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleConfirm = (ids) => {
    setSelectedCheckboxIds(ids); // Guardar los IDs seleccionados
    setIsModalOpen(false); // Cerrar el modal después de confirmar
  };

  return (
    <div className={stylesDashboard.container}>
      <span>
        <p className={stylesDashboard.titlePage}>Registrar venta</p>

        <div className={stylesDashboard.containerBetween}>
          <div className={stylesDashboard.flexInput}>
            <p>Cliente:</p>
            <input type="text" />
          </div>



          <div className={stylesDashboard.flexInput}>
              <p>Fecha:</p>
              <input type="date" />
            </div>
       
        
        </div>

        <div className={stylesDashboard.table}>
          <div className={stylesDashboard.containerBetween}>
            <div className={stylesDashboard.flexInput}>
              <p></p>
            
            </div>

            <button onClick={openModal}>
            {" "}
            <div className={`${icon.containerIcon} ${icon.buyIcon}`}></div>
            Añadir Producto
          </button>

          </div>
          <div className={stylesDashboard.containerBetween}>
            <div className={stylesDashboard.flexInput}>
              <p></p>
            </div>

            <div className={stylesDashboard.flexInput}></div>
          </div>
          <p>hola</p>

          <div>
        <h3>IDs seleccionados:</h3>
        {selectedCheckboxIds.length > 0 ? (
          <ul>
            {selectedCheckboxIds.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        ) : (
          <p>No hay IDs seleccionados</p>
        )}
      </div>

        </div>
        {isModalOpen && (
        <ModalProduct
          onClose={closeModal}
          onConfirm={handleConfirm}
          selectedIds={selectedCheckboxIds} // Pasar los IDs seleccionados
        />
      )}
      </span>
    </div>
  );
}
