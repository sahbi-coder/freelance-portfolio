import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css";


export default function Layout({children,t}) {

  return (
    <>
      <Navbar t={t}/>
      <div className={styles.container}>{children}</div>
    </>
  );
}
