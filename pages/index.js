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

export async function getServerSideProps({locale}){
  async function getImages() {
    try {
      let res = [];
      let result = (await axios.get(process.env.NEXT_PUBLIC_BASE_URL+"/api/images")).data;
      for (let i = 0; i < result.length; i++) {
        let src = await downloadImages(result[i].img);
        let image = { id: result[i].id, src };
        res.push(image);
      }
      return res
    } catch {
      return []
    }
  }
  const images = await getImages()

  return {
    props:{
      ...(await serverSideTranslations(locale,['common','canvas','about','services','work','contact','navbar'])),images
    }
  }
}


export default function Home({images}) {
  const {t}=useTranslation()
  return (
    <>
      <Head>
        
        <meta name="description" content="Oussama jedda | Website" />
        <link rel="icon" href="/icon.svg" />
        <title>oussama jedda</title>
      </Head>

      <Layout t={t}>
        <main>
          <Canvas t={t}/>
          <About t={t}/>
          <Services t={t}/>
          <Work t={t} images={images}/>
        </main>
        <footer>
          <Contact t={t}/>
        </footer>
      </Layout>
    </>
  );
}
