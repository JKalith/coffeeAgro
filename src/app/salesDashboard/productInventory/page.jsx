"use client";
import globals from "../../styles/globals.module.css";
import { useState } from "react";

import InventoryTable from "../../salesDashboard/productInventory/inventoryTable";
import Modal from "../../ui/popUpWindow/window";
import icon from "../../ui/styles/icons.module.css";
export default function manageInventory() {
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
        <p className={globals.titlePage}>Inventario de productos</p>

        <div className={globals.table}>
       

          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            symbol={icon.closeIcon}
          >
            
          </Modal>
   <InventoryTable></InventoryTable>
        </div>
      </span>
    </div>
  );
}
