import React from "react";
import Work from "../components/Work";
import Layout from "../components/Layout";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({locale}){
  return {
    props:{
      ...(await serverSideTranslations(locale,['common','work','navbar']))
    }
  }
}
function Workk() {
 const {t}=useTranslation()
  return (
    <>
      <Head>
        <title>Oussama Jedda</title>
        <meta name="description" content="Oussama jedda | Website" />
        <link rel="icon" href="/icon.svg" />
        <title>oussama jedda | work</title>
      </Head>

      <Layout t={t}>
        <Work t={t}/>
      </Layout>
    </>
  );
}

export default Workk;
