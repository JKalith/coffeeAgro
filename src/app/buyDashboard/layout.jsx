
import SideNav from "../ui/buyDashboard/sideNav";
import styles from "../styles/sideNav.module.css";

export default function Layout({ children }) {
    return (
        <div className={styles.contain}>
 
        <div >
          <SideNav />
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    );
  }