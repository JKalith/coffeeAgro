
import HistoryTable from '../../salesDashboard/historyInvoice/historyTable';
import globals from '../../styles/globals.module.css';
import icon from '../../ui/styles/icons.module.css';
export default function registerInvoice() {


    return (


<div>
    <p className={globals.titlePage}>
      Historial de facturas
    </p>
  <div className={globals.table} >



  <button >
                  <div
                    className={`${icon.containerIcon} ${icon.filterSearchIcon}`}
                  ></div>
                  filtrar
                </button>
  <HistoryTable/>
  
  </div>
  </div>
      )
  };
  