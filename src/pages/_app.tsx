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
          // @ts-ignore
          window.dataLayer = window.dataLayer || [];
          function gtag(...args: unknown[]) {
            // @ts-ignore
            window.dataLayer.push(args);
          }
          gtag("js", new Date());
          gtag("config", "G-MQHLVKFF7P");
        }}
      />
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Main RSS Feed"
          href="/rss/main.rss"
        />
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
