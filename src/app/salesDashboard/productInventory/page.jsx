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
          <div className={globals.flexInput}>
            <div className={globals.filterWrapper}>
              {/* Botón para alternar la visualización del filtro */}

              {/* Contenedor del filtro */}
              <div
                className={`${globals.filterContainer} ${
                  isOpen ? globals.openFilter : globals.semiOpenFilter
                }`}
              >
                <button className={globals.buttonFilter} onClick={toggleFilter}>
                  <div
                    className={`${icon.containerIcon} ${
                      isOpen ? icon.closeFilterIcon : icon.openFilterIcon
                    }`}
                  ></div>
                  Filtrar
                </button>

                <input type="text" name="input1" placeholder="Campo 1"  ></input>
                <input type="text" name="input2" placeholder="Campo 2" />
                <input type="text" name="input3" placeholder="Campo 3" />

                <button className={globals.containerButton}>
                  <div
                    className={`${icon.containerIcon} ${icon.filterSearchIcon}`}
                  ></div>
                  filtrar
                </button>
              </div>
            </div>
          </div>

          {/* Aquí iría el Modal y la tabla de inventario */}
       
          <InventoryTable />
          <Modal isOpen={false} onClose={() => {}} symbol={icon.closeIcon} />
        </div>
      </span>
    </div>
  );
}
