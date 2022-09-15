import { AppProps } from "next/app";
import Head from "next/head";
import "normalize.css";
import "./styles.scss";
import styles from "./_app.module.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div id={styles.mainContainer}>
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
