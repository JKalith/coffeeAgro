"use client";
import React, { useState } from "react";
import globals from "../../styles/globals.module.css";
import icon from "../../ui/styles/icons.module.css";
import ModalProduct from "../registerSale/modalProduct";
import RegisterSaleTable from "../registerSale/RegisterSaleTable"; // Importamos el nuevo componente

export default function RegisterSale() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productList, setProductList] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleProductSelect = (id) => {
    setSelectedProductId(id);
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setSelectedProductId(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const fetchProduct = async () => {
    if (!selectedProductId) {
      alert("Por favor, ingrese un ID de producto.");
      return;
    }
    try {
      const response = await fetch(`/api/product/${selectedProductId}`);
      if (!response.ok) {
        throw new Error("Producto no encontrado");
      }
      const product = await response.json();

      setProductList((prevList) => {
        const existingProductIndex = prevList.findIndex(
          (item) => item.C_product === product.C_product
        );

        if (existingProductIndex >= 0) {
          const updatedList = [...prevList];
          updatedList[existingProductIndex].quantity = quantity;
          return updatedList;
        } else {
          return [...prevList, { ...product, quantity }];
        }
      });

      setSelectedProductId("");
      setQuantity(1);
    } catch (error) {
      console.error("Error al buscar el producto:", error);
      alert("Error al buscar el producto.");
    }
  };

  // Función para quitar un producto del arreglo
  const removeProduct = (productId) => {
    setProductList((prevList) =>
      prevList.filter((product) => product.C_product !== productId)
    );
  };

  return (
    <div className={globals.container}>
      <span>
        <p className={globals.titlePage}>Registrar venta</p>
        <div className={globals.containerBetween}>
          <div className={globals.flexInput}>
            <p>Cliente:</p>
            <input type="text" />
          </div>
          <div className={globals.flexInput}>
            <p>Fecha:</p>
            <input type="date" />
          </div>
        </div>
        <div className={globals.table}>
          <div className={globals.containerBetween}>
            <div className={globals.flexInput}>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className={globals.flexInput}>
                  <p>Producto seleccionado:</p>
                  <input
                    type="number"
                    value={selectedProductId}
                    onChange={handleInputChange}
                    placeholder="ID del producto"
                  />
                  <p>Cantidad:</p>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    placeholder="Cantidad"
                  />
                  <button type="button" onClick={fetchProduct}>
                  <div className={`${icon.containerIcon} ${icon.addIcon}`}></div>
                    Agregar
                  </button>
                </div>
              </form>
            </div>
            <button onClick={openModal}>
              <div className={`${icon.containerIcon} ${icon.searchProduct}`}></div>
              Buscar producto
            </button>
          </div>

          {/* Componente RegisterSaleTable */}
          <RegisterSaleTable
            productList={productList}
            removeProduct={removeProduct}
          />
        </div>

        {isModalOpen && (
          <ModalProduct
            onClose={closeModal}
            onSelectProduct={handleProductSelect}
          />
        )}
      </span>
    </div>
  );
}
