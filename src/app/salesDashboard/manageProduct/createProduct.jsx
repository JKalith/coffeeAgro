"use client";
import { useState, useEffect } from "react";
import styles from "../../styles/salesDashboard/manageCategory.module.css";
import stylesWindow from "../../ui/styles/popUpWindow.module.css";
import globals from '../../styles/globals.module.css'
const CreateProduct = ({ isOpen, onClose ,onProductCreated }) => {
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

  // Carga las categorías al montar el componente
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
      }
    };
    fetchCategories();
  }, []);

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleClose = () => {
    setFormData(initialFormState); // Limpia el formulario
    setMessage(""); // Limpia el mensaje
    onClose(); // Llama la función para cerrar la ventana emergente
  };

  // Validaciones del formulario
  const validateForm = () => {
    const unitPriceValue = parseFloat(formData.unitPrice);
    if (formData.stock < 0) {
      setMessage("El stock no puede ser negativo.");
      return false;
    }
    if (unitPriceValue <= 0 || unitPriceValue > 9999.99) {
      setMessage(
        "El precio unitario debe ser mayor que cero y no puede exceder 9999.99."
      );
      return false;
    }
    return true;
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          D_product_name: formData.productName,
          C_category: parseInt(formData.categoryCode),
          Q_stock: parseInt(formData.stock),
          M_unit_price: parseFloat(formData.unitPrice).toFixed(2),
          B_status: formData.status,
        }),
      });

      if (response.ok) {


        setMessage("Producto creado exitosamente");
        setFormData(initialFormState);
        onProductCreated();
      } else {
        const errorData = await response.json();
        setMessage(
          response.status === 400
            ? "Por favor, revise los datos ingresados."
            : `Error: ${errorData.error}`
        );
      }
    } catch (error) {
      setMessage("Error al crear el producto. Por favor, intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // No renderizar si el modal no está abierto
  if (!isOpen) return null;

  return (
    <div className={stylesWindow.modalOverlay}>
      <div className={stylesWindow.modalContent}>
        <h2>Crear Nuevo Producto</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Nombre del Producto:
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Categoría:
            <select
              name="categoryCode"
              value={formData.categoryCode}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una categoría</option>
              {categories.length === 0 ? (
                <option value="" disabled>
                  Cargando categorías...
                </option>
              ) : (
                categories.map((category) => (
                  <option key={category.C_category} value={category.C_category}>
                    {category.D_category_name}
                  </option>
                ))
              )}
            </select>
          </label>
          <label>
            Stock:
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Precio Unitario:
            <p>Descripcion</p>
            <input
              type="number"
              name="unitPrice"
              step="0.01"
              value={formData.unitPrice}
              onChange={handleChange}
              required
            />
          </label>
<div className={globals.containerButton}>



          <button  className={globals.saveButton} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creando..." : "Registrar"}
          </button>



        <button className={globals.closeButton} onClick={handleClose}>Cerrar</button>
  
        </div>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default CreateProduct;
