"use client";

import { useState, useEffect } from "react";
import HistoryTable from "../../salesDashboard/historyInvoice/historyTable";
import globals from "../../styles/globals.module.css";
import icon from "../../ui/styles/icons.module.css";
import { useRouter } from "next/navigation";

export default function HistoryInvoice() {
  const [isOpen, setIsOpen] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterDate, setFilterDate] = useState(""); // Filtro de fecha
  const [minAmount, setMinAmount] = useState(""); // Filtro monto mínimo
  const [maxAmount, setMaxAmount] = useState(""); // Filtro monto máximo
  const [filterPaymentMethod, setFilterPaymentMethod] = useState(""); // Filtro de método de pago
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const toggleFilter = () => {
    setIsOpen((prev) => !prev);
  };

  // Función para obtener las facturas desde la API
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/sale/");
      if (!response.ok) {
        throw new Error("Error fetching invoices: " + response.statusText);
      }
      const data = await response.json();
      setInvoices(data);
      setFilteredInvoices(data);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Generamos listas de nombres y métodos de pago únicos para el filtro
  const clientNames = [...new Set(invoices.map((invoice) => invoice.D_client))];
  const paymentMethods = [
    ...new Set(
      invoices.map((invoice) => invoice.Payment_methods?.D_payment_method)
    ),
  ];

  // Función para aplicar el filtro cuando se presiona el botón "Filtrar"
  const handleFilter = () => {
    let results = invoices;

    // Filtrar por nombre de cliente
    if (filterName) {
      results = results.filter((invoice) =>
        invoice.D_client.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    // Filtrar por fecha
    if (filterDate) {
      results = results.filter((invoice) => {
        // Convertir la fecha de la factura a formato "YYYY-MM-DD" y comparar
        const invoiceDate = new Date(invoice.F_date)
          .toISOString()
          .split("T")[0];
        return invoiceDate === filterDate;
      });
    }

    // Filtrar por monto total
    if (minAmount) {
      results = results.filter(
        (invoice) => invoice.M_total_price >= parseFloat(minAmount)
      );
    }
    if (maxAmount) {
      results = results.filter(
        (invoice) => invoice.M_total_price <= parseFloat(maxAmount)
      );
    }

    // Filtrar por método de pago
    if (filterPaymentMethod) {
      results = results.filter(
        (invoice) =>
          invoice.Payment_methods?.D_payment_method === filterPaymentMethod
      );
    }

    setFilteredInvoices(results);
  };

  return (
    <div>
      <p className={globals.titlePage}>Historial de facturas</p>

      <div className={globals.table}>
        <div className={globals.filterWrapper}>
          <div
            className={`${globals.filterContainer} ${
              isOpen ? globals.openFilter : globals.semiOpenFilter
            }`}
          >


            <div className={globals.containerFilter}>



            </div>
            <button className={globals.buttonFilter} onClick={toggleFilter}>
              <div
                className={`${icon.containerIcon} ${
                  isOpen ? icon.closeFilterIcon : icon.openFilterIcon
                }`}
              ></div>
              Filtro
            </button>

            {/* Filtro de fecha */}
            <input
              className={`${globals.inputFilter}`}
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />

            {/* Filtro de nombre de cliente */}
            <input
          className={`${globals.inputFilter} ${globals.marginFilter}`}
              type="text"
              placeholder="Nombre de cliente"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />

            {/* Filtro de monto mínimo */}
            <input
              className={globals.inputFilter}
              type="number"
              placeholder="Monto mínimo"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
            />

            {/* Filtro de monto máximo */}
            <input
         className={`${globals.inputFilter} ${globals.marginFilter}`}
              type="number"
              placeholder="Monto máximo"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
            />

            {/* Filtro de método de pago */}
            <select
              className={globals.inputFilter}
              value={filterPaymentMethod}
              onChange={(e) => setFilterPaymentMethod(e.target.value)}
            >
              <option value="">Todos los método de pago</option>
              {paymentMethods.map((method, index) => (
                <option key={index} value={method}>
                  {method}
                </option>
              ))}
            </select>


<div className={globals.filterButtonContainer} >





            <button className={globals.buttonFilterElements} onClick={handleFilter}>
              <div
                className={`${icon.containerIcon} ${icon.filterSearchIcon}`}
              ></div>
              Filtrar
            </button>
          </div>
        </div>
        </div>
        {/* Pasamos las facturas filtradas a HistoryTable */}
        <HistoryTable
          invoices={filteredInvoices}
          loading={loading}
          error={error}
          onSelectedInvoice={(id) =>
            router.push(`/salesDashboard/historyInvoice/${id}`)
          }
        />
      </div>
    </div>
  );
}
