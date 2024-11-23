"use client";
import globals from "../../styles/globals.module.css";
import styles from "../../styles/salesDashboard/registerSale.module.css";
import { useState, useEffect } from "react";
import icon from "../../ui/styles/icons.module.css";
import CreateCategory from "../../salesDashboard/manageCategory/createCategory";
import ChangeStatusModal from "../../salesDashboard/manageCategory/changeStatusModal"; // Asegúrate de importar tu componente de cambio de estado

export default function CategoryTable(  {refresh}   ) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    
  }, [refresh]);


  const openEditModal = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedCategory(null);
    setIsEditModalOpen(false);
 
  };

  const openStatusModal = (category) => {
    setSelectedCategory(category);
    setIsStatusModalOpen(true);
  };

  const closeStatusModal = () => {
    setSelectedCategory(null);
    setIsStatusModalOpen(false);
    fetchCategories();
  };
  const handleCategorySaved = async () => {
    await fetchCategories(); // Actualiza las categorías sin recargar la página
    closeEditModal(); // Cierra el modal de edición
  };


  return (
    <div>
      <div className={globals.displayTitle}>
        <div className={globals.titleRow}>
          <div className={globals.cell}>
            <p>Categoria</p>
          </div>
          <div className={globals.cell}>
            <p>Estado</p>
          </div>
          <div className={globals.cell}>
            <p>Modificar</p>
          </div>
          <div className={globals.cell}>
            <p>Cambiar estado</p>
          </div>
        </div>
      </div>
      <div className={globals.scrollTable}>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.C_category} className={globals.productRow}>
              <div className={globals.cell}>
                <p>{category.D_category_name}</p>
              </div>
              <div className={globals.cell}>
                <p>{category.B_status ? "Activo" : "Inactivo"}</p>
              </div>

              <div className={globals.cell}>
                <button
                  className={globals.modifyButton}
                  onClick={() => openEditModal(category)}
                >
                  <div
                    className={`${icon.containerIcon} ${icon.modifyIcon}`}
                  ></div>
                  Modificar
                </button>
              </div>

              <div className={globals.cell}>
                <button
                  className={globals.changeButton}
                  onClick={() => openStatusModal(category)}
                >
                  <div
                    className={`${icon.containerIcon} ${icon.changeIcon}`}
                  ></div>
                  Cambiar estado
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay categorías disponibles.</p>
        )}

{isEditModalOpen && (
          <CreateCategory
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            initialCategory={selectedCategory}
            onCategoryCreated={handleCategorySaved}
          />
        )}


        {isStatusModalOpen && (
          <ChangeStatusModal
            isOpen={isStatusModalOpen}
            onClose={closeStatusModal}
            category={selectedCategory}
            setCategories={setCategories}
          />
        )}
      </div>
    </div>
  );
}
