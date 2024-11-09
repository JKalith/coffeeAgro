"use client";
import globals from "../../styles/globals.module.css";
import { useState, useEffect } from "react";
import AccountingClosingWindow from "../../salesDashboard/accountingClosing/accountingClosingWindow";
import AccountingJustificationWindow from "../../salesDashboard/accountingClosing/accountingJustificationWindow";
import icon from '../../ui/styles/icons.module.css'
import spinner from '../../ui/styles/loadingScreen.module.css'

export default function AccountingTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listProduct, setListProduct] = useState([]);
  const [message, setMessage] = useState("");
  const [isClosingModalOpen, setIsClosingModalOpen] = useState(false);
  const [isJustificationModalOpen, setIsJustificationModalOpen] = useState(false);


  

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/product/");
      if (!response.ok) {
        throw new Error("Error fetching product: " + response.statusText);
      }
      const data = await response.json();
      // Filtrar solo los productos con estado true
      const activeProducts = data.filter((product) => product.B_status);
      setProducts(activeProducts);
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
      const name = product.D_product_name;

      const physicalQuantity = parseInt(physicalInput.value || "0", 10);
      const systemQuantity = product.Q_stock;
      const difference = systemQuantity - physicalQuantity;
      const justification = "";

      return {
        name,
        code: product.C_product,
        systemQuantity,
        physicalQuantity,
        difference,
        justification,
      };
    });
const updatedListFilter = updatedList.filter((product) => product.difference !== 0);
    setListProduct(updatedListFilter);

    const allZeroDifference = updatedList.every(
      (item) => item.difference === 0
    );
    if (allZeroDifference) {
      setIsClosingModalOpen(true);
    } else {
      setIsJustificationModalOpen(true);
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
      <form onSubmit={handleOperation}>
      <div className={globals.scrollTable}>
   
          {loading ? (


<div className={spinner.loadingContainer}>
<div className={spinner.loader}></div>
<p>Cargando...</p>
</div>
 



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
                    required
                  />
                </div>
              </div>
            ))
          ) : (
            <p className={globals.errorMessage}>
              No hay productos disponibles.
            </p>
          )}


      


     
      




       
      </div>
      <div className={globals.displayLeft}>



<button type="submit" className={globals.button}>
<div
          className={`${icon.containerIcon} ${icon.createAccountingIcon }`}
        ></div>
  Procesar
</button>


</div>
</form>
      
      <AccountingClosingWindow
        isOpen={isClosingModalOpen}
        onClose={() => setIsClosingModalOpen(false)}
      />
      <AccountingJustificationWindow
        isOpen={isJustificationModalOpen}
        onClose={() => setIsJustificationModalOpen(false)}
        listProduct={listProduct}
        setListProduct={setListProduct} 
      />
    </div>
  );
}
