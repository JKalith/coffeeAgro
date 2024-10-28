import styles from "../styles/navBar.module.css"
import Link from 'next/link';
import icons from "../styles/icons.module.css"
import BtnNavBar from "./btnNavBar"
const Navbar = () => {
  return (
<nav className={styles.navbar}>
  <div className={styles.logo}>Pegadero de la mula</div>
  <ul className={styles.navLinks}>
  
    <li>  <BtnNavBar href="/buyDashboard" buttonText="Gestion de compras" icon={icons.buyIcon} /> </li>
    <li> <BtnNavBar href="/salesDashboard" buttonText="Gestion de ventas" icon={icons.salesIcon } /></li>
    <li> <BtnNavBar href="/plotDashboard" buttonText="Lotes" icon={icons.loteIcon} /></li>
    <li> <BtnNavBar href="/payrollDashboard" buttonText="Planilla" icon={icons.loteIcon} /></li>
  </ul>
</nav>
  );
};

export default Navbar;








