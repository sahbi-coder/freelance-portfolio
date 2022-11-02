import React from "react";
import Contact from "../components/Contact";
import Layout from "../components/Layout";
import Head from "next/head";


function contact() {
 
  return (
    <>
      <Head>
        <title>Oussama Jedda</title>
        <meta name="description" content="Oussama jedda | Website" />
        <link rel="icon" href="/icon.svg" />
        <title>oussama jedda | contact</title>
      </Head>

      <>
        <Layout>
          <Contact />
        </Layout>
      </>
    </>
  );
}

export default contact;
