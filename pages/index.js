import Head from "next/head";
import Layout from "../components/Layout";
import Canvas from "../components/Canvas";
import Services from "../components/Services";
import About from "../components/About";
import Work from "../components/Work";
import Contact from "../components/Contact";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import downloadImages from "../functions/downloadImagesFromFirebase";
import axios from "axios";
import { useEffect, useState } from "react";


export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "canvas",
        "about",
        "services",
        "work",
        "contact",
        "navbar",
      ])),
    },
  };
}

export default function Home() {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  useEffect(() => {
    (async function getImages() {
      let res = [];
      try {
        let result = (
          await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/api/images")
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
        <title>oussama jedda</title>
      </Head>

      <Layout t={t}>
        <main>
          <Canvas t={t} />
          <About t={t} />
          <Services t={t} />
          <Work t={t} images={images} />
        </main>
        <footer>
          <Contact t={t} />
        </footer>
      </Layout>
    </>
  );
}
