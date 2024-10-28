
import SideNav from "../ui/salesDashboard/sideNav";
import styles from "../styles/sideNav.module.css";

export default function Layout({ children }) {
    return (
        <div className={styles.contain}>
         
        <div className={styles.sidebar}>
          <SideNav />
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    );
  }