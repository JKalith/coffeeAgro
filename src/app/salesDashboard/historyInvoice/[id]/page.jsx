"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import globals from "../../../styles/globals.module.css";
import CancelInvoiceModal from "../../historyInvoice/changestatusInvoice";

export default function InvoiceDetails() {
  const { id } = useParams();
  const [saleDetails, setSaleDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSaleDetails = async () => {
      try {
        const response = await fetch(`/api/saleDetails/${id}`);
        if (!response.ok) {
          throw new Error("Error fetching sale details");
        }
        const data = await response.json();
        setSaleDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSaleDetails();
  }, [id]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCancelConfirm = () => {
    console.log("Factura anulada");
  };

  if (loading) return <p>Cargando detalles de la factura...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <p className={globals.titlePage}>Detalles de la Factura #{id}</p>

  

  <div className={`${globals.table}`}>

      <div className={`${globals.titleRow} ${globals.displayTitle}`}>



        <div className={globals.cell}>
          <p>Código de Producto</p>
        </div>
        <div className={globals.cell}>
          <p>Nombre del Producto</p>
        </div>
        <div className={globals.cell}>
          <p>Cantidad</p>
        </div>
        <div className={globals.cell}>
          <p>Precio Unitario</p>
        </div>
      </div>

      <div className={globals.scrollTable}>
        <div className={globals.containerRows}>
          {saleDetails.length > 0 ? (
            saleDetails.map((detail) => (
              <div key={detail.C_sale_detail} className={globals.productRow}>
                <div className={globals.cell}>
                  <p>{detail.Products?.C_product}</p>
                </div>
                <div className={globals.cell}>
                  <p>{detail.Products?.D_product_name}</p>
                </div>
                <div className={globals.cell}>
                  <p>{detail.Q_quantity}</p>
                </div>
                <div className={globals.cell}>
                  <p>{detail.Products?.M_unit_price}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron detalles para esta factura.</p>
          )}
        </div>
      </div>
      </div>
      
      <button onClick={handleOpenModal} className={globals.closeButton}>
        Anular Factura
      </button>

      <CancelInvoiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        invoiceId={id}
        onCancelConfirm={handleCancelConfirm}
      />
    </div>
  );
}
