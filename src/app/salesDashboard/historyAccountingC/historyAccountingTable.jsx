import globals from '../../styles/globals.module.css'






export default function historyAccountingTable() {

return (
    <div>
      <div className={globals.displayTitle}>
        <div className={globals.productRow}>
          <div className={globals.cell}>
            <p>Numero de cierre</p>
          </div>
          <div className={globals.cell}>
            <p>Fecha de cierre</p>
          </div>
          <div className={globals.cell}>
            <p>Estado</p>
          </div>
      



        </div>
      </div>
      <div className={globals.scrollTable}>
     
      </div>
    </div>
  );
}
