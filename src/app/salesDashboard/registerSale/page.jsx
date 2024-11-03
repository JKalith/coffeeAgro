"use client";
import React, { useState, useEffect } from "react";
import globals from "../../styles/globals.module.css";
import styles from '../../styles/salesDashboard/registerSale.module.css'
import icon from "../../ui/styles/icons.module.css";
import ModalProduct from "../registerSale/modalProduct";
import RegisterSaleTable from "../registerSale/RegisterSaleTable";

export default function RegisterSale() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [productList, setProductList] = useState([]);
  const [client, setClient] = useState("");
  const [date, setDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [listPaymentMethods, setListPaymentMethods] = useState([]);
  const [error, setError] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch("/api/paymentMethods");
      if (!response.ok) {
        throw new Error(
          "Error fetching metodos de pago: " + response.statusText
        );
      }
      const data = await response.json();
      setListPaymentMethods(data);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const handleProductSelect = (id) => {
    setSelectedProductId(id);
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setSelectedProductId(e.target.value);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "" || Number(value) > 0) {
      setQuantity(value);
    }
  };

  const fetchProduct = async () => {
    if (!selectedProductId) {
      alert("Por favor, ingrese un ID de producto.");
      return;
    }
    if (quantity < 1) {
      alert("Por favor, ingrese una cantidad.");
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

        let updatedList;
        if (existingProductIndex >= 0) {
          const updatedItem = {
            ...prevList[existingProductIndex],
            quantity: quantity,
          };
          updatedList = [...prevList];
          updatedList[existingProductIndex] = updatedItem;
        } else {
          updatedList = [...prevList, { ...product, quantity }];
        }

        // Recalcular total
        const newTotal = updatedList.reduce((acc, item) => {
          const quantity = Number(item.quantity) || 0;
          const price = Number(item.M_unit_price) || 0;
          return acc + quantity * price;
        }, 0);

        setTotal(newTotal);
        console.log("Nuevo total:", newTotal); // Verifica el nuevo total

        return updatedList;
      });

      setSelectedProductId("");
      setQuantity(1);
    } catch (error) {
      console.error("Error al buscar el producto:", error);
      alert("Error al buscar el producto.");
    }
  };

  const removeProduct = (productId) => {
    setProductList((prevList) => {
      const updatedList = prevList.filter(
        (product) => product.C_product !== productId
      );

      // Recalcular total
      const newTotal = updatedList.reduce((acc, item) => {
        const quantity = Number(item.quantity) || 0;
        const price = Number(item.M_unit_price) || 0;
        return acc + quantity * price;
      }, 0);

      setTotal(newTotal);
      return updatedList;
    });
  };

  const handleRegisterSale = async (e) => {
    e.preventDefault(); // Prevenir el envío del formulario

    if (productList.length === 0) {
      alert("Por favor, agrega al menos un producto.");
      return;
    }

    // Registrar la venta
    try {
      const response = await fetch("/api/sale/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          C_payment_method: paymentMethod,
          F_date: date,
          D_client: client,
          M_total_price: total,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al registrar la venta response ok");
      }

      const saleData = await response.json();

      // Registrar los detalles de la venta
      await Promise.all(
        productList.map((product) =>
          fetch("/api/saleDetails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              C_sale: saleData.C_Sale, // Usar el ID de la venta creada
              C_Product: product.C_product,
              Q_quantity: product.quantity,
            }),
          })
        )
      );

      alert("Venta registrada con éxito!");
      // Reiniciar el formulario después de registrar
      setProductList([]);
      setTotal(0);
      setClient("");
      setDate("");
      setPaymentMethod("");
    } catch (error) {
      console.error("Error al registrar la venta catch:", error);
      alert("Error al registrar la venta cath.");
    }
  };

  return (
    <div className={globals.container}>
      <span>
        <p className={globals.titlePage}>Registrar venta</p>

        {/* Formulario principal de registro de la venta */}
        <form onSubmit={handleRegisterSale}>
          <div className={globals.containerBetween}>
            <div className={globals.flexInput}>
              <p>Cliente:</p>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                required
              />
            </div>
            <div className={globals.flexInput}>
              <p>Fecha:</p>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              
              />
            </div>
          </div>

          <div className={globals.table}>
            <div className={globals.containerBetween}>
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
                  <div
                    className={`${icon.containerIcon} ${icon.addIcon}`}
                  ></div>
                  Agregar
                </button>
              </div>
              <button type="button" onClick={openModal}>
                <div
                  className={`${icon.containerIcon} ${icon.searchProduct}`}
                ></div>
                Buscar producto
              </button>
            </div>

            <RegisterSaleTable
              productList={productList}
              removeProduct={removeProduct}
            />
          </div>





<div className={styles.containerSale}>




<div className={styles.displayPayment}>





<div className={styles.flexInput}>
            <p>Método de pago:</p>
            <select
            className={styles.inputPayment}
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
                 
              <option value="" >Método de pago</option>
              {listPaymentMethods.map((method) => (
                <option
                  key={method.C_payment_method}
                  value={method.C_payment_method}
                >
                  {method.D_payment_method}
                </option>
              ))}
            </select>
            </div>
            <div className={styles.flexInput}>
            <p>Total:</p>

            <input

className={styles.inputPayment}
              type="number"
              value={String(total)}
              readOnly
              placeholder="Total"
            />
           </div>
           <div className={styles.containerButton}>



           <button type="submit" className={globals.closeButton}>
            Reiniciar 
          </button>
          <button type="submit" className={globals.saveButton}>
            Registrar 
          </button>
          </div>
          </div>
      
          
          
          </div>
        </form>

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
