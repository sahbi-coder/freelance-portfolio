import styles from "../styles/Galery.module.css";
import axios from "axios";
import downloadImages from "../functions/downloadImagesFromFirebase";
import Image from "next/image";
import Modal from "../components/Modal";
import { useRef, useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Layout from "../components/Layout";
import Head from "next/head";

export default function Galery() {
  const modalRef = useRef(null);
  const [images, setImages] = useState([]);

  const openModal = (img) => {
    modalRef.current.openModal(img);
  };
  const { t } = useTranslation();
  function generatePlaceHolders(number) {
    let result = [];
    for (let i = 0; i < number; i++) {
      result.push("placeholder");
    }
    return result;
  }
 
  useEffect(() => {
    (async function getImages() {
      let res = [];
      try {
        let result = (
          await axios.get("/api/images")
        ).data;
        for (let i = 0; i < result.length; i++) {
          let src = await downloadImages(result[i].img);
          let image = { id: result[i].id, src };
          res.push(image);
        }
      } catch {
        res = [];
      }
      setImages(res);
    })();
  }, []);
  return (
    <>
      <Head>
        <meta name="description" content="Oussama jedda | Website" />
        <link rel="icon" href="/icon.svg" />
        <title>oussama jedda | galery</title>
      </Head>
      <Layout t={t}>
        <Modal ref={modalRef} scrambledImages={images} t={t} />
        <div className={styles.grid} >
          {!images.length &&
            generatePlaceHolders(18).map((item, index) => {
              return (
                <div className={styles.gridItem} key={index}>
                  <div className={styles.placeHolder}></div>
                </div>
              );
            })}
          {images.map((item, index) => {
            return (
              <div className={styles.gridItem} key={item.id}>
                <div className={styles.placeHolder}></div>
                <Image
                  src={item.src}
                  layout="fill"
                  objectFit="cover"
                  onClick={() => {
                    openModal(item.src);
                  }}
                />
              </div>
            );
          })}
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "galery", "navbar"])),
    },
  };
}
