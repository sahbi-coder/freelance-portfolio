import React from "react";
import styles from "../styles/Loader.module.css";
import { InfinitySpin } from "react-loader-spinner";


function Loder() {
  return (
  
      <div className={styles.container}>
        <InfinitySpin width="200" color="#08fdd8" />
      </div>

  );
}

export default Loder;
