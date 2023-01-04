import Head from "next/head";
import Layout from "../components/Layout";
import Canvas from "../components/Canvas";
import Services from "../components/Services";
import About from "../components/About";
import Work from "../components/Work";
import Contact from "../components/Contact";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";



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

const images=[
  {id:1,src:'images/img1.jpg'},
  {id:2,src:'images/img2.jpg'},
  {id:3,src:'images/img3.jpg'},
  {id:4,src:'images/img4.jpg'},
  {id:5,src:'images/img5.jpg'},
  {id:6,src:'images/img6.jpg'},
  {id:7,src:'images/img7.jpg'},
  {id:8,src:'images/img8.jpg'},

]
export default function Home() {
  const { t } = useTranslation();

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

