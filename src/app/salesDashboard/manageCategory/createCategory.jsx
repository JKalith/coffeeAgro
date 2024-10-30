"use client";
import stylesDashboard from "../../styles/dashboard.module.css";
import styles from "../../styles/salesDashboard/registerSale.module.css";
import { useState } from "react";

export default function CreateCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [status, setStatus] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/category/", {  // Ruta corregida
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          D_category_name: categoryName,
          B_status: status,
        }),
      });

      if (response.ok) {
        setMessage('Categoría creada exitosamente');
        setCategoryName('');
        setStatus(true);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setMessage('Error al crear la categoría');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={stylesDashboard.container}>
      <h2>Crear Nueva Categoría</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Nombre de la Categoría:
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </label>
        <label>
        <input type="hidden" value={status} />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creando...' : 'Crear Categoría'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}