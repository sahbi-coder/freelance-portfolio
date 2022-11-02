import "../styles/globals.css";
import { useState } from "react";
import Router from "next/router";
import Loader from "../components/Loader";
import AppRapper from "../context/state";


function MyApp({ Component, pageProps }) {
 
  const [isLoading, setIsLoading] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    setIsLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setIsLoading(false);
  });
  return (
    <AppRapper>
      {isLoading ? <Loader /> : <Component {...pageProps} />}
    </AppRapper>
  );
}

export default MyApp;
