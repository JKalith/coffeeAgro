"use client";
import globals from "../../styles/globals.module.css";
import { useState, useEffect } from "react";
import AccountingClosingWindow from "../../salesDashboard/accountingClosing/accountingClosingWindow";
export default function AccountingTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listProduct, setListProduct] = useState([]);
  const [message, setMessage] = useState("");
  const [isClosingModalOpen, setIsClosingModalOpen] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/product/");
      if (!response.ok) {
        throw new Error("Error fetching product: " + response.statusText);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOperation = (event) => {
    event.preventDefault();
    const updatedList = products.map((product) => {
      const physicalInput = document.getElementById(
        `physical-${product.C_product}`
      );
      const physicalQuantity = parseInt(physicalInput.value || "0", 10);
      const systemQuantity = product.Q_stock;
      const difference = systemQuantity - physicalQuantity;

      return {
        code: product.C_product,
        systemQuantity,
        physicalQuantity,
        difference,
      };
    });

    setListProduct(updatedList);

    const allZeroDifference = updatedList.every(
      (item) => item.difference === 0
    );
    if (allZeroDifference) {
      setIsClosingModalOpen(true);
    } else {
      let message = "";
      updatedList.forEach((item) => {
        message +=
          item.difference !== 0
            ? `El producto ${item.code} tiene una diferencia de ${item.difference}. `
            : `El producto ${item.code} no tiene diferencia. `;
      });
      setMessage(message);
    }
    console.log("Processed list:", updatedList);
  };

  return (
    <div>
      <div className={globals.displayTitle}>
        <div className={globals.productRow}>
          <div className={globals.cell}>
            <p>Codigo de Producto</p>
          </div>
          <div className={globals.cell}>
            <p>Nombre</p>
          </div>
          <div className={globals.cell}>
            <p>Cantidad en sistema</p>
          </div>
          <div className={globals.cell}>
            <p>Cantidad fisica</p>
          </div>
        </div>
      </div>
      <div className={globals.scrollTable}>
        <form onSubmit={handleOperation}>
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div key={product.C_product} className={globals.productRow}>
                <div className={globals.cell}>
                  <p>{product.C_product}</p>
                </div>
                <div className={globals.cell}>
                  <p>{product.D_product_name}</p>
                </div>
                <div className={globals.cell}>
                  <p>{product.Q_stock}</p>
                </div>
                <div className={globals.cell}>
                  <input
                    id={`physical-${product.C_product}`}
                    type="number"
                    min="0"
                    placeholder="Cantidad"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className={globals.errorMessage}>
              No hay productos disponibles.
            </p>
          )}
          <button type="submit" className={globals.saveButton}>
            Procesar
          </button>
        </form>
      </div>
      <div>
        <h2>Resultados de la Operación</h2>
        {message && <p>{message}</p>}
        {listProduct.length > 0 ? (
          <ul>
            {listProduct.map((item, index) => (
              <li key={index}>
                <p>Producto: {item.code}</p>
                <p>Cantidad en sistema: {item.systemQuantity}</p>
                <p>Cantidad física: {item.physicalQuantity}</p>
                <p>Diferencia: {item.difference}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No se ha procesado ningún producto.</p>
        )}
      </div>
      <AccountingClosingWindow
        isOpen={isClosingModalOpen}
        onClose={() => setIsClosingModalOpen(false)}
      />
    </div>
  );
}
