"use client";
import { useState } from "react";
import HistoryTableAccounting from "../../salesDashboard/historyAccountingC/historyAccountingTable";
import globals from "../../styles/globals.module.css";
import icon from "../../ui/styles/icons.module.css";
export default function historyAccountingC() {

  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    setIsOpen((prev) => !prev);
  };


  return (
    <div>
      <p className={globals.titlePage}>Historial de cierre contable</p>
      <div className={globals.table}>
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

                <button className={`${globals.containerButton}  `}>
                  <div
                    className={`${icon.containerIcon} ${icon.filterSearchIcon}`}
                  ></div>
                  filtrar
                </button>
              </div>
            </div>
        <HistoryTableAccounting />
      </div>
    </div>
  );
}
