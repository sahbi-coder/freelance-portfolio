import Head from "next/head";
import Layout from "../components/Layout";
import { useEffect } from "react";
import Canvas from "../components/Canvas";
import Services from "../components/Services";
import About from "../components/About";
import Work from "../components/Work";
import Contact from "../components/Contact";

export default function Home() {

  return (
    <>
      <Head>
        <title>Oussama Jedda</title>
        <meta name="description" content="Oussama jedda | Website" />
        <link rel="icon" href="/icon.svg" />
        <title>oussama jedda</title>
      </Head>

      <Layout>
        <main>
          <Canvas />
          <About />
          <Services />
          <Work />
        </main>
        <footer>
          <Contact />
        </footer>
      </Layout>
    </>
  );
}
