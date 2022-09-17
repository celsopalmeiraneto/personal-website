import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import "normalize.css";
import "highlight.js/styles/github-dark-dimmed.css";
import "./styles.scss";
import styles from "./_app.module.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div id={styles.mainContainer}>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-MQHLVKFF7P"
        strategy="afterInteractive"
        onLoad={() => {
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag("js", new Date());

          gtag("config", "G-MQHLVKFF7P");
        }}
      />
      <Head>
        <title>Celso Palmeira Neto's HP</title>
      </Head>
      <header id={styles.header}>
        <p>
          <a href="/">
            Hey there! I am <span>Celso Neto</span>
          </a>
        </p>
      </header>
      <div id={styles.pageContent}>
        <Component {...pageProps} />
      </div>
      <footer id={styles.footer}>With love from Celso</footer>
    </div>
  );
};

export default MyApp;
