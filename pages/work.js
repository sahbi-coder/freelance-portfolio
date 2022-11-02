import React from "react";
import Work from "../components/Work";
import Layout from "../components/Layout";
import Head from "next/head";

function work() {
 
  return (
    <>
      <Head>
        <title>Oussama Jedda</title>
        <meta name="description" content="Oussama jedda | Website" />
        <link rel="icon" href="/icon.svg" />
        <title>oussama jedda | work</title>
      </Head>

      <Layout>
        <Work />
      </Layout>
    </>
  );
}

export default work;
