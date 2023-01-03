import "../styles/globals.css";
import { useState } from "react";
import Router from "next/router";
import Loader from "../pages/loader";
import AppRapper from "../context/state";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const [timeOut, setTime] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    if (url !== "/login" && url !== "/admin") {
      setIsLoading(true);
    }
  });
  Router.events.on("routeChangeComplete", (url) => {
    if (url !== "/login" && url !== "/admin") {
      setTime(true);
      setTimeout(() => {
        setTime((timeOut) => false);
      }, 1500);
      setIsLoading(false);
    }
  });

  return (
    <AppRapper>
      {isLoading || timeOut ? (
        <Loader {...pageProps} />
      ) : (
        <Component {...pageProps} />
      )}
    </AppRapper>
  );
}

export default appWithTranslation(MyApp);
