"use client";
import globals from "../../styles/globals.module.css";
import { useState, useEffect } from "react";
import AddStock from "../productInventory/addStock";

export default function InventoryTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true); // Añade esto para mostrar el estado de carga al actualizar
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

  const openAddStockModal = (product) => {
    setSelectedProduct(product);
  };

  const closeAddStockModal = () => {
    setSelectedProduct(null);
    fetchProducts(); // Llama a fetchProducts para recargar los datos
  };

  return (
    <div>
      <div className={globals.displayTitle}>
        <div className={globals.productRow}>
          <div className={globals.cell}>
            <p>Producto</p>
          </div>
          <div className={globals.cell}>
            <p>Cantidad en stock</p>
          </div>
          <div className={globals.cell}>
            <p>Precio Unitario</p>
          </div>
          <div className={globals.cell}>
            <p>Agregar stock</p>
          </div>
        </div>
      </div>
      <div className={globals.scrollTable}>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div key={product.C_product} className={globals.productRow}>
              <div className={globals.cell}>
                <p>{product.D_product_name}</p>
              </div>
              <div className={globals.cell}>
                <p>{product.Q_stock}</p>
              </div>
              <div className={globals.cell}>
                <p>{product.M_unit_price}</p>
              </div>
              <div className={globals.cell}>
                <button onClick={() => openAddStockModal(product)}>
                  Agregar stock
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>

      {/* AddStock Modal */}
      <AddStock
        isOpen={!!selectedProduct}
        onClose={closeAddStockModal}
        product={selectedProduct}
      />
    </div>
  );
}
