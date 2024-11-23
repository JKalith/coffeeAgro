"use client";

import globals from "../../styles/globals.module.css";
import icon from "../../ui/styles/icons.module.css";
import { useState, useEffect } from "react";
import CreateProduct from "../../salesDashboard/manageProduct/createProduct";
import ChangeProductStatusModal from "../../salesDashboard/manageProduct/ChangeStatusModal";

export default function TableProducts({ refresh }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [refresh]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/product/");
      if (!response.ok) {
        throw new Error("Error fetching products: " + response.statusText);
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

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/category/");
      if (!response.ok) {
        throw new Error("Error fetching categories: " + response.statusText);
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
  };

  const handleProductSaved = () => {
    fetchProducts(); // Refresh products when a product is created or updated
    closeEditModal(); // Close the modal after saving
  };
  const [isChangeStatusModalOpen, setIsChangeStatusModalOpen] = useState(false);

  const openChangeStatusModal = (product) => {
    setSelectedProduct(product);
    setIsChangeStatusModalOpen(true);
  };

  const closeChangeStatusModal = () => {
    setSelectedProduct(null);
    setIsChangeStatusModalOpen(false);
  };

  return (
    <div>
      <div className={globals.displayTitle}>
        <div className={globals.titleRow}>
          <div className={globals.cell}>
            <p>Producto</p>
          </div>
          <div className={globals.cell}>
            <p>Precio Unitario</p>
          </div>
          <div className={globals.cell}>
            <p>Categoria</p>
          </div>
          <div className={globals.cell}>
            <p>Estado</p>
          </div>
          <div className={globals.cell}>
          <p>Cambiar estado</p></div>


          <div className={globals.cell}>
            <p>Modificar</p>
          </div>
        </div>
      </div>
      <div className={globals.scrollTable}>
        <div className={globals.containerRows}>
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
                  <p>{product.M_unit_price}</p>
                </div>
                <div className={globals.cell}>
                  <p>{product.Categories?.D_category_name}</p>
                </div>
                <div className={globals.cell}>
                  <p>{product.B_status ? "Activo" : "Inactivo"}</p>
                </div>

                <div className={globals.cell}>
                  <button
                    className={globals.changeButton}
                    onClick={() => openChangeStatusModal(product)}
                  >
                    <div
                      className={`${icon.containerIcon} ${icon.changeIcon}`}
                    ></div>
                    Cambiar
                  </button>
                </div>

                <div className={globals.cell}>
                  <button
                    className={globals.modifyButton}
                    onClick={() => openEditModal(product)}
                  >
                    <div
                      className={`${icon.containerIcon} ${icon.modifyIcon}`}
                    ></div>
                    Modificar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      </div>

      {isEditModalOpen && (
        <CreateProduct
          isOpen={isEditModalOpen}
          onClose={closeEditModal} // Close modal on close action
          onProductCreated={handleProductSaved} // Trigger refresh on product creation/update
          isEditing={true}
          productData={selectedProduct}
          categories={categories}
        />
      )}
      {isChangeStatusModalOpen && (
        <ChangeProductStatusModal
          isOpen={isChangeStatusModalOpen}
          onClose={closeChangeStatusModal}
          product={selectedProduct}
          products={products}
          setProducts={setProducts}
        />
      )}
    </div>
  );
}
