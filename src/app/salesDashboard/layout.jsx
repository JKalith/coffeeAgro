
import SideNav from "../ui/salesDashboard/sideNav";
import styles from "../ui/styles/sideNav.module.css";

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