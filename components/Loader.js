import React from "react";
import styles from "../styles/Loader.module.css";
import { InfinitySpin } from "react-loader-spinner";
import Layout from "./Layout";

function Loder() {
  return (
    <Layout>
      <div className={styles.container}>
        <InfinitySpin width="200" color="#08fdd8" />
      </div>
    </Layout>
  );
}

export default Loder;
