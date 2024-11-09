"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import globals from "../../../styles/globals.module.css";
import RevertAccountingModal from "../../historyAccountingC/changeStatusAccounting";

export default function AccountingDetails() {
  const { id } = useParams();
  const [accountingDetails, setAccountingDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAccountingDetails = async () => {
      try {
        const response = await fetch(`/api/detailsAccountingSales/${id}`);
        if (!response.ok) {
          throw new Error("Error fetching accounting details");
        }
        const data = await response.json();
        setAccountingDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAccountingDetails();
  }, [id]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCancelConfirm = () => {
    console.log("Cierre no procesado");
  };

  if (loading) return <p>Cargando detalles de cierre contable...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <p className={globals.titlePage}>Detalles de la Cierre contable #{id}</p>

      <div className={`${globals.table}`}>
        <div className={`${globals.productRow} ${globals.displayTitle}`}>
          <div className={globals.cell}>
            <p>Nombre del Producto</p>
          </div>
          <div className={globals.cell}>
            <p>Estado</p>
          </div>
          <div className={globals.cell}>
            <p>Cant.Faltante/sobrante</p>
          </div>
          <div className={globals.cell}>
            <p>Justificación</p>
          </div>
        </div>

        <div className={globals.scrollTable}>
          <div className={globals.containerRows}>
            {accountingDetails.length > 0 ? (
              accountingDetails.map((detail) => (
                <div key={detail.C_accounting_detail} className={globals.productRow}>
                  <div className={globals.cell}>
                    <p>{detail.Products?.D_product_name}</p>
                  </div>
                  <div className={globals.cell}>
                    <p>{detail.Q_subtraction < 0 ? "Sobrante" : "Faltante"}</p>
                  </div>
                  <div className={globals.cell}>
                    <p>{detail.Q_subtraction < 0 ? detail.Q_subtraction*-1 :  detail.Q_subtraction}</p>
                  </div>
                  <div className={globals.cell}>
                    <p>{detail.D_justification}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No se encontraron detalles para este cierre contable.</p>
            )}
          </div>
        </div>
      </div>

      <button onClick={handleOpenModal} className={globals.closeButton}>
        Revertir cierre contable
      </button>

      <RevertAccountingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        AccountingId={id}
        onCancelConfirm={handleCancelConfirm}
      />
    </div>
  );
}
