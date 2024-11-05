import TableAccounting from '../../salesDashboard/accountingClosing/accountingTable'
import globals from '../../styles/globals.module.css'
export default function accoutingClosing() {
    return (

      <div> 
        <p className={globals.titlePage}>
Registrar cierre contable
        </p>

  <div className={globals.table}>
   

  <TableAccounting></TableAccounting>
  </div>
  </div>
      )
  };
  