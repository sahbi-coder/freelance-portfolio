import styles from "../styles/Galery.module.css";
import axios from "axios";
import downloadImages from "../functions/cloudeFuctions/downloadImagesFromFirebase";
import Image from "next/image";
import Modal from "../components/Modal";
import { useRef } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Layout from "../components/Layout";
import Head from "next/head";

export default function Galery({ images }) {
  const modalRef = useRef(null);
  const openModal = (img) => {
    modalRef.current.openModal(img);
  };
  const { t } = useTranslation();
  return (
    <>
      <Head>
        
        <meta name="description" content="Oussama jedda | Website" />
        <link rel="icon" href="/icon.svg" />
        <title>oussama jedda | galery</title>
      </Head>
      <Layout t={t}>
        <Modal ref={modalRef} scrambledImages={images} t={t} />
        <div className={styles.grid}>
          {images.map((item, index) => {
            return (
              <div className={styles.gridItem} key={item.id}>
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

export async function getStaticProps({locale}) {
  async function getImages() {
    try {
      let res = [];
      let result = (
        await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/api/images")
      ).data;
      for (let i = 0; i < result.length; i++) {
        let src = await downloadImages(result[i].img);
        let image = { id: result[i].id, src };
        res.push(image);
      }

      return res;
    } catch {
      return [];
    }
  }
  const images = await getImages();
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "galery", "navbar"])),
      images,
    },
  };
}
