import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import FooterSection from "@/components/footer-section";
import HeaderSection from "@/components/header-section";
import Preloader from "@/components/preloader";
import ScrollToButtonButton from "@/components/scroll-to-top-button";
import { getMainMenu } from "@/lib/api";

import "bootstrap/dist/css/bootstrap.css";

import "@/css/lineicons.css";
import "@/css/tiny-slider.min.css";
import "@/css/main.css";

function MyApp({ Component, mainMenu, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const authToken = process.env.NEXT_PUBLIC_BUTTER_CMS_API_KEY;

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js");

    const showLoader = () => {
      setIsLoading(true);
    };

    const removeLoader = () => {
      setIsLoading(false);
    };

    Router.events.on("routeChangeStart", showLoader);
    Router.events.on("routeChangeComplete", removeLoader);
    Router.events.on("routeChangeError", removeLoader);

    return () => {
      Router.events.off("routeChangeStart", showLoader);
      Router.events.off("routeChangeComplete", removeLoader);
      Router.events.off("routeChangeError", removeLoader);
    };
  }, [authToken, router]);

  const pageLayout = authToken ? (
    <>
      <HeaderSection mainMenu={mainMenu} />
      <Component {...pageProps} />
      <FooterSection mainMenu={mainMenu} />
      <ScrollToButtonButton />
    </>
  ) : (
    <Component {...pageProps} />
  );

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          content="ie=edge"
          httpEquiv="x-ua-compatible"
        />
        <title>
          Sample Landing Page with Components - powered by ButterCMS
        </title>
        <meta
          content="Sample Landing Page with Components - powered by ButterCMS"
          name="description"
        />
        <meta
          content="width=device-width, initial-scale=1"
          name="viewport"
        />
        <link
          href="https://buttercms.com/static/v2/images/favicon.png"
          rel="shortcut icon"
          type="image/x-icon"
        />
      </Head>

      {isLoading && <Preloader></Preloader>}

      {!isLoading && pageLayout}
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const authToken = process.env.NEXT_PUBLIC_BUTTER_CMS_API_KEY;
  let mainMenu = [];

  if (authToken) {
    try {
      mainMenu = await getMainMenu();
    } catch (e) {
      console.error("Couldn't load main menu links.", e);
    }
  }

  return { ...appProps, mainMenu };
};

export default MyApp;
