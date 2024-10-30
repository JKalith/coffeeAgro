"use client";
import { useState, useEffect } from "react";
import stylesDashboard from "../../styles/dashboard.module.css";
import styles from "../../styles/salesDashboard/registerSale.module.css";

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    productName: '',
    categoryCode: '',
    stock: 0,
    unitPrice: 0,
    status: true,
  });
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/category');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          setMessage('Error al cargar categorías.');
        }
      } catch (error) {
        console.error("Error al obtener categorías: ", error);
        setMessage('Error al cargar categorías.');
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(''); 

    const unitPriceValue = parseFloat(formData.unitPrice);

    if (formData.stock < 0) {
      setMessage('El stock no puede ser negativo.');
      setIsSubmitting(false);
      return;
    }

    if (unitPriceValue <= 0 || unitPriceValue > 9999.99) {
      setMessage('El precio unitario debe ser mayor que cero y no puede exceder 9999.99.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/product/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          D_product_name: formData.productName,
          C_category: parseInt(formData.categoryCode),
          Q_stock: parseInt(formData.stock),
          M_unit_price: unitPriceValue.toFixed(2),
          B_status: formData.status,
        }),
      });

      if (response.ok) {
        setMessage('Producto creado exitosamente');
        setFormData({
          productName: '',
          categoryCode: '',
          stock: 0,
          unitPrice: 0,
          status: true,
        });
      } else {
        const errorData = await response.json();
        if (response.status === 400) {
          setMessage('Por favor, revise los datos ingresados.');
        } else {
          setMessage(`Error: ${errorData.error}`);
        }
      }
    } catch (error) {
      setMessage('Error al crear el producto. Por favor, intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={stylesDashboard.container}>
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
              <option value="" disabled>Cargando categorías...</option>
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
          <input
            type="number"
            name="unitPrice"
            step="0.01"
            value={formData.unitPrice}
            onChange={handleChange}
            required
          />
        </label>
        
        <input type="hidden" name="status" value={formData.status} />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creando...' : 'Crear Producto'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
