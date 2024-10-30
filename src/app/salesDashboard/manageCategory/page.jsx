"use client";
import stylesDashboard from "../../styles/dashboard.module.css";
import { useState } from "react";
import CategoryTable from '../../salesDashboard/manageCategory/categoryTable'
import CreateCategory from "../../salesDashboard/manageCategory/createCategory";
import Modal from "../../ui/popUpWindow/window";
import icon from "../../ui/styles/icons.module.css";
export default function manageCategory() {
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
        <p className={stylesDashboard.titlePage}>Gestion de categorias</p>

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
            <CreateCategory></CreateCategory>
          </Modal>
       <CategoryTable></CategoryTable>
        </div>
      </span>
    </div>
  );
}
