import Head from "next/head";
import Layout from "../components/Layout";
import { useEffect } from "react";
import Canvas from "../components/Canvas";
import Services from "../components/Services";
import About from "../components/About";
import Work from "../components/Work";
import Contact from "../components/Contact";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({locale}){
  return {
    props:{
      ...(await serverSideTranslations(locale,['common','canvas','about','services','work','contact','navbar']))
    }
  }
}


export default function Home() {
  const {t}=useTranslation()
  return (
    <>
      <Head>
        <title>Oussama Jedda</title>
        <meta name="description" content="Oussama jedda | Website" />
        <link rel="icon" href="/icon.svg" />
        <title>oussama jedda</title>
      </Head>

      <Layout t={t}>
        <main>
          <Canvas t={t}/>
          <About t={t}/>
          <Services t={t}/>
          <Work t={t}/>
        </main>
        <footer>
          <Contact t={t}/>
        </footer>
      </Layout>
    </>
  );
}
