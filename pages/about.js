import React from "react";
import About from "../components/About";
import Layout from "../components/Layout";
import Head from "next/head";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({locale}){
  return {
    props:{
      ...(await serverSideTranslations(locale,['common','about','navbar']))
    }
  }
}

function Aboutt() {
  const {t}=useTranslation()
  return (
    <>
      <Head>
      
        <meta name="description" content="Oussama jedda | Website" />
        <link rel="icon" href="/icon.svg" />
        <title>oussama jedda | about</title>
      </Head>


      <Layout t={t}>
        <About t={t}/>
      </Layout>
    </>
  );
}

export default Aboutt;
