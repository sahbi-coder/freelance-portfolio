
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import Head from "next/head";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({locale}){
  return {
    props:{
      ...(await serverSideTranslations(locale,['common','navbar']))
    }
  }
}

function Loaderr() {
  const {t}=useTranslation()
  return (
    <>
      <Head>
      
        <meta name="description" content="Oussama jedda | Website" />
        <link rel="icon" href="/icon.svg" />
        <title>oussama jedda | loading</title>
      </Head>


      <Layout t={t}>
        <Loader />
      </Layout>
    </>
  );
}

export default Loaderr;