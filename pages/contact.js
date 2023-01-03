
import Contact from "../components/Contact";
import Layout from "../components/Layout";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({locale}){
  return {
    props:{
      ...(await serverSideTranslations(locale,['common','contact','navbar']))
    }
  }
}


function Contactt() {
 const {t} = useTranslation()
  return (
    <>
      <Head>
      
        <meta name="description" content="Oussama jedda | Website" />
        <link rel="icon" href="/icon.svg" />
        <title>oussama jedda | contact</title>
      </Head>

      <>
        <Layout t={t}>
          <Contact t={t}/>
        </Layout>
      </>
    </>
  );
}

export default Contactt;
