import globals from '../../styles/globals.module.css'






export default function historyTable() {

return (
    <div>
      <div className={globals.displayTitle}>
        <div className={globals.productRow}>
          <div className={globals.cell}>
            <p>Numero de facturas</p>
          </div>
          <div className={globals.cell}>
            <p>Cliente</p>
          </div>
          <div className={globals.cell}>
            <p>Fecha</p>
          </div>
          <div className={globals.cell}>
            <p>Metodo de pago </p>
          </div>
          <div className={globals.cell}>
            <p>Estado </p>
          </div>
          <div className={globals.cell}>
            <p>Monto total </p>
          </div>



        </div>
      </div>
      <div className={globals.scrollTable}>
     
      </div>
    </div>
  );
}
