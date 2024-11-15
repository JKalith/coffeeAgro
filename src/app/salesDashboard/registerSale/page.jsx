"use client";
import React, { useState, useEffect } from "react";
import globals from "../../styles/globals.module.css";
import styles from "../../styles/salesDashboard/registerSale.module.css";
import icon from "../../ui/styles/icons.module.css";
import ModalProduct from "../registerSale/modalProduct";
import RegisterSaleTable from "../registerSale/RegisterSaleTable";
import ErrorMessage from "../../ui/popUpWindow/errorMessage";

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
  const [errorMessage, setErrorMessage] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleCloseErrorMessage = () => setErrorMessage(null);

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch("/api/paymentMethods");
      if (!response.ok) throw new Error("Error fetching metodos de pago");
      const data = await response.json();
      setListPaymentMethods(data);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error al obtener los métodos de pago.");
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const handleProductSelect = (id) => {
    setSelectedProductId(id);
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => setSelectedProductId(e.target.value);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "" || Number(value) > 0) setQuantity(value);
  };

  const fetchProduct = async () => {
    if (!selectedProductId) {
      setErrorMessage("Por favor, ingrese un ID de producto.");
      return;
    }
    if (quantity < 1) {
      setErrorMessage("Por favor, ingrese una cantidad.");
      return;
    }
    try {
      const response = await fetch(`/api/product/${selectedProductId}`);
      if (!response.ok) throw new Error("Producto no encontrado");
      const product = await response.json();

      if (product.Q_stock < quantity) {
        setErrorMessage(
          `No hay suficiente stock en el inventario del producto ${product.D_product_name}`
        );
        return;
      }
      if (!product.B_status) {
        setErrorMessage(
          `El producto ${product.D_product_name} está inactivo`
        );
        return;
      }

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

        const newTotal = updatedList.reduce((acc, item) => {
          const quantity = Number(item.quantity) || 0;
          const price = Number(item.M_unit_price) || 0;
          return acc + quantity * price;
        }, 0);

        setTotal(newTotal);
        return updatedList;
      });

      setSelectedProductId("");
      setQuantity(1);
    } catch (error) {
      console.error("Error al buscar el producto:", error);
      setErrorMessage("Error al buscar el producto.");
    }
  };

  const removeProduct = (productId) => {
    setProductList((prevList) => {
      const updatedList = prevList.filter(
        (product) => product.C_product !== productId
      );

      const newTotal = updatedList.reduce((acc, item) => {
        const quantity = Number(item.quantity) || 0;
        const price = Number(item.M_unit_price) || 0;
        return acc + quantity * price;
      }, 0);

      setTotal(newTotal);
      return updatedList;
    });
  };

  const resetSale = () => {
    setProductList([]);
    setTotal(0);
    setClient("");
    setDate("");
    setPaymentMethod("");
  };

  const handleRegisterSale = async (e) => {
    e.preventDefault();

    if (productList.length === 0) {
      setErrorMessage("Por favor, agrega al menos un producto.");
      return;
    }

    try {
      const response = await fetch("/api/sale/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          C_payment_method: paymentMethod,
          F_date: date,
          D_client: client,
          M_total_price: total,
        }),
      });

      if (!response.ok) throw new Error("Error al registrar la venta");

      const saleData = await response.json();

      await Promise.all(
        productList.map((product) =>
          fetch("/api/saleDetails", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              C_sale: saleData.C_Sale,
              C_Product: product.C_product,
              Q_quantity: product.quantity,
            }),
          })
        )
      );

      setErrorMessage("Venta registrada con éxito!");
      resetSale();
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      setErrorMessage("Error al registrar la venta.");
    }
  };

  return (
    <div className={globals.container}>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          onClose={handleCloseErrorMessage}
        />
      )}
      <span>
        <p className={globals.titlePage}>Registrar venta</p>
        <form onSubmit={handleRegisterSale}>
          <div className={globals.containerBetween}>
            <div className={globals.flexInput}>
              <p>Cliente:</p>
              <input
                className={styles.inputPayment}
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                required
              />
            </div>
            <div className={globals.flexInput}>
              <p>Fecha:</p>
              <input
                className={styles.inputPayment}
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
                <p className={styles.flexInputTitle}>
                  Producto seleccionado:
                  <input
                    className={styles.inputPayment}
                    type="number"
                    value={selectedProductId}
                    onChange={handleInputChange}
                    placeholder="ID del producto"
                  />
                </p>
                <p className={styles.flexInputTitle}>
                  Cantidad:
                  <input
                    className={styles.inputPayment}
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    placeholder="Cantidad"
                  />
                </p>



                <button
                  type="button"
                  className={`${globals.button} ${globals.addButton}  `}
                  onClick={fetchProduct}
                >
                  <div
                    className={`${icon.containerIcon} ${icon.addIcon}`}
                  ></div>
                  Agregar
                </button>
              </div>



              <button
                type="button"
                onClick={openModal}
                className={globals.button}
              >
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
                  <option value="">Método de pago</option>
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
                <button
                  onClick={resetSale}
                  type="button"
                  className={globals.closeButton}
                >
                  Cancelar
                </button>
                <button type="submit" className={globals.saveButton}>
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </form>
      </span>
      {isModalOpen && (
        <ModalProduct
          onSelectProduct={handleProductSelect}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
