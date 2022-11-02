import React from "react";
import Services from "../components/Services";
import Layout from "../components/Layout";
import Head from "next/head";

function services() {

  return (
    <>
      <Head>
        <title>Oussama Jedda</title>
        <meta name="description" content="Oussama jedda | Website" />
        <link rel="icon" href="/icon.svg" />
        <title>oussama jedda | services</title>
      </Head>

      <Layout>
        <Services />
      </Layout>
    </>
  );
}

export default services;
