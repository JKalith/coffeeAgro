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
    
        <HistoryTableAccounting />
      </div>
    </div>
  );
}
