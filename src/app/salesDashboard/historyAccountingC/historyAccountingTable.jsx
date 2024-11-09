"use client";
import globals from "../../styles/globals.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function HistoryAccountingTable() {
  const [accounting, setAccounting] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchAccounting = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/accountingClosingSales/");
      if (!response.ok) {
        throw new Error("Error fetching accounting: " + response.statusText);
      }
      const data = await response.json();
      setAccounting(data);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSelectedAccounting = (id) => {
    router.push(`/salesDashboard/historyAccountingC/${id}`);
  };

  useEffect(() => {
    fetchAccounting();
  }, []);

  return (
    <div>
      <div className={globals.displayTitle}>
        <div className={globals.productRow}>
          <div className={globals.cell}>
            <p>Numero de cierre</p>
          </div>
          <div className={globals.cell}>
            <p>Fecha de cierre</p>
          </div>
          <div className={globals.cell}>
            <p>Estado</p>
          </div>
        </div>
      </div>
      <div className={globals.scrollTable}>
        <div className={globals.containerRows}>
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : accounting.length > 0 ? (
            accounting.map((account) => (
              <div
                onClick={() => onSelectedAccounting(account.C_accounting_closing)}
                key={account.C_accounting_closing}
                className={globals.productRow}
              >
                <div className={globals.cell}>
                  <p>{account.C_accounting_closing}</p>
                </div>
                <div className={globals.cell}>
                  <p>{format(new Date(account.F_date), "MMM dd yyyy, hh:mm a")}</p>
                </div>
                <div className={globals.cell}>
                  <p>{account.B_status ? "Procesado" : "Sin procesar"}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No hay cierre contables registrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
