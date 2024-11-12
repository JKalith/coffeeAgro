"use client";

import globals from "../../styles/globals.module.css";
import { format } from "date-fns";

export default function HistoryTable({ invoices, loading, error, onSelectedInvoice }) {
  return (
    <div>
      <div className={globals.displayTitle}>
        <div className={globals.productRow}>
          <div className={globals.cell}><p>Numero de facturas</p></div>
          <div className={globals.cell}><p>Cliente</p></div>
          <div className={globals.cell}><p>Fecha</p></div>
          <div className={globals.cell}><p>Metodo de pago</p></div>
          <div className={globals.cell}><p>Estado</p></div>
          <div className={globals.cell}><p>Monto total</p></div>
        </div>
      </div>
      <div className={globals.scrollTable}>
        <div className={`${globals.containerRows} ${globals.cursorPointer}`}>
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : invoices.length > 0 ? (
            invoices.map((invoice) => (
              <div
                onClick={() => onSelectedInvoice(invoice.C_Sale)}
                key={invoice.C_Sale}
                className={`${globals.productRow} ${globals.hoverRows}`}
              >
                <div className={globals.cell}><p>{invoice.C_Sale}</p></div>
                <div className={globals.cell}><p>{invoice.D_client}</p></div>
                <div className={globals.cell}>
                  <p>{format(new Date(invoice.F_date), "MMM dd yyyy, hh:mm a")}</p>
                </div>
                <div className={globals.cell}><p>{invoice.Payment_methods?.D_payment_method}</p></div>
                <div className={globals.cell}><p>{invoice.B_status ? "Procesada" : "Anulada"}</p></div>
                <div className={globals.cell}><p>{invoice.M_total_price}</p></div>
              </div>
            ))
          ) : (
            <p>No hay facturas registradas.</p>
          )}
        </div>
      </div>
    </div>
  );
}
