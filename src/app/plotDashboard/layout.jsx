
import SideNav from "../ui/plotDashboard/sideNav";
import styles from "../ui/styles/sideNav.module.css";

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