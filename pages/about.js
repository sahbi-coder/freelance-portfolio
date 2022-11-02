import React from "react";
import About from "../components/About";
import Layout from "../components/Layout";
import Head from "next/head";


function about() {

  return (
    <>
      <Head>
        <title>Oussama Jedda</title>
        <meta name="description" content="Oussama jedda | Website" />
        <link rel="icon" href="/icon.svg" />
        <title>oussama jedda | about</title>
      </Head>

      <Layout>
        <About />
      </Layout>
    </>
  );
}

export default about;
