"use client";
import globals from "../../styles/globals.module.css";
import { useState } from "react";
import CategoryTable from "../../salesDashboard/manageCategory/categoryTable";
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
    <div className={globals.container}>
      <span>
        <p className={globals.titlePage}>Gestion de categorias</p>

        <div className={globals.table}>
          <button onClick={openModal}>
            {" "}
            <div className={`${icon.containerIcon} ${icon.addCategoryIcon}`}></div>
            Registrar categoria
          </button>

          <CreateCategory isOpen={isModalOpen} onClose={closeModal} />

          <CategoryTable></CategoryTable>
        </div>
      </span>
    </div>
  );
}
