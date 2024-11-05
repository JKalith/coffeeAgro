import globals from '../../styles/globals.module.css'






export default function accoutingTable() {

return (
    <div>
      <div className={globals.displayTitle}>
        <div className={globals.productRow}>
          <div className={globals.cell}>
            <p>Producto</p>
          </div>
          <div className={globals.cell}>
            <p>Cantidad en stock</p>
          </div>
          <div className={globals.cell}>
            <p>Precio unitario</p>
          </div>
          <div className={globals.cell}>
            <p>Agregar stock</p>
          </div>
        </div>
      </div>
      <div className={globals.scrollTable}>
     
      </div>
    </div>
  );
}
