import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css";
import useChangeLang from "../hooks/useChangeLang";

export default function Layout({ children }) {
 useChangeLang()
  return (
    <>
      <Navbar />
      <div className={styles.container}>{children}</div>
    </>
  );
}
