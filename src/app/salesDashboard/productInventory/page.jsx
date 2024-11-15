"use client";
import globals from "../../styles/globals.module.css";
import { useState } from "react";

import InventoryTable from "../../salesDashboard/productInventory/inventoryTable";
import Modal from "../../ui/popUpWindow/window";
import icon from "../../ui/styles/icons.module.css";

export default function ManageInventory() {
  const [isOpen, setIsOpen] = useState(false);

  // Estado que controla si el filtro está completamente expandido
  const toggleFilter = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={globals.container}>

      <span>
        <p className={globals.titlePage}>Inventario de productos</p>

        <div className={globals.table}>
     


       
          <InventoryTable />
          <Modal isOpen={false} onClose={() => {}} symbol={icon.closeIcon} />
        </div>
      </span>
    </div>
  );
}
