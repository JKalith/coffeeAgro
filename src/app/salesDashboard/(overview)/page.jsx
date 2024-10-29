import styles from '../../styles/dashboard.module.css'
import TableProducts from '../../salesDashboard/manageProduct/tableProduct'
export default function Home() {
    return (
      <main>
  <p>
  
  Este es el home de salesDashboard
  
  </p>

  <TableProducts></TableProducts>



  <div className={styles.containerP}>

<div className={styles.item}></div>
<div className={styles.item}></div>
<div className={styles.item}></div>
<div className={styles.item}></div>
          </div>




  </main>
      )
  
  };
  