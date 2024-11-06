
import HistoryTable from '../../salesDashboard/historyAccountingC/historyAccountingTable';
import globals from '../../styles/globals.module.css';
import icon from '../../ui/styles/icons.module.css';
export default function historyAccountingC() {


    return (


<div>
    <p className={globals.titlePage}>
      Historial de cierre contable
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
  