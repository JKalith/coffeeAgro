"use client";
import { useState, useEffect } from "react";
import styles from "../../styles/salesDashboard/manageProduct.module.css";
import stylesWindow from "../../ui/styles/popUpWindow.module.css";
import globals from "../../styles/globals.module.css";

const CreateProduct = ({
  isOpen,
  onClose,
  onProductCreated,
  isEditing,
  productData,
}) => {
  const initialFormState = {
    productName: "",
    categoryCode: "",
    stock: 0,
    unitPrice: 0,
    status: true,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          setMessage("Error al cargar categorías.");
        }
      } catch (error) {
        console.error("Error al obtener categorías: ", error);
        setMessage("Error al cargar categorías.");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isEditing && productData) {
      console.log("Cargando datos del producto para editar:", productData);
      setFormData({
        productName: productData.D_product_name || "",
        categoryCode: productData.C_category
          ? productData.C_category.toString()
          : "",
        stock: productData.Q_stock || 0,
        unitPrice: productData.M_unit_price
          ? productData.M_unit_price.toString()
          : "0",
        status: productData.B_status || true,
      });
    } else {
      setFormData(initialFormState);
    }
  }, [isEditing, productData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleClose = () => {
    setFormData(initialFormState);
    setMessage("");
    onClose();
  };

  const validateForm = () => {
    const unitPriceValue = parseFloat(formData.unitPrice);
    if (formData.stock < 0) {
      setMessage("El stock no puede ser negativo.");
      return false;
    }
    if (unitPriceValue <= 0 || unitPriceValue > 999999.99) {
      setMessage(
        "El precio unitario debe ser mayor que cero y no puede exceder 999999.99."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const url = isEditing
        ? `/api/product/${productData.C_product}`
        : "/api/product/";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          D_product_name: formData.productName,
          C_category: parseInt(formData.categoryCode, 10),
          Q_stock: isEditing ? undefined : parseInt(formData.stock, 10),
          M_unit_price: parseFloat(formData.unitPrice).toFixed(2),
          B_status: formData.status,
        }),
      });

      if (response.ok) {
        setMessage("Producto creado/modificado exitosamente");
        setFormData(initialFormState);
        onProductCreated();
        setMessage();
      } else {
        const errorData = await response.json();
        setMessage(
          response.status === 400
            ? "Por favor, revise los datos ingresados."
            : ` ${errorData.error || "Error desconocido."}`
        );
      }
    } catch (error) {
      console.error("Error al crear/modificar el producto: ", error);
      setMessage("Nombre del producto ya existente");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={stylesWindow.modalOverlay} >
      <div className={stylesWindow.modalContent}>
        <p className={globals.titles}>
          {" "}
          {isEditing ? "Modificar Producto" : "Crear Nuevo Producto"}
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div
            className={`${
              isEditing ? styles.editingFlexInput : styles.creatingFlexInput
            }`}
          >
            <div>
              <p>Nombre del Producto:</p>
              <label>
                <input
                  className={styles.input}
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                />
              </label>

              <p> Categoría: </p>
              <label>
                <select
                  className={styles.input}
                  name="categoryCode"
                  value={formData.categoryCode}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  {loadingCategories ? (
                    <option value="" disabled>
                      Cargando categorías...
                    </option>
                  ) : (
                    categories.map((category) => (
                      <option
                        key={category.C_category}
                        value={category.C_category}
                      >
                        {category.D_category_name}
                      </option>
                    ))
                  )}
                </select>
              </label>
            </div>

            <div>
              {!isEditing && (
                <label>
                  <p>Stock:</p>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </label>
              )}
              <label>
                <p>Precio Unitario:</p>

                <input
                  className={styles.input}
                  type="number"
                  name="unitPrice"
                  step="1000.00"
                  value={formData.unitPrice}
                  onChange={handleChange}
                  required
                />
              </label>{" "}
            </div>
          </div>
          <div className={globals.containerButton}>
            <button
              type="button"
              className={globals.closeButton}
              onClick={handleClose}
            >
              Cerrar
            </button>

            <button
              className={globals.saveButton}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Guardando..."
                : isEditing
                ? "Modificar"
                : "Registrar"}
            </button>
          </div>
        </form>

        {message && <p style={{ color: "red" }}>{message}</p>}
      </div>
    </div>
  );
};

export default CreateProduct;
