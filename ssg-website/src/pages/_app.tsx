import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import "highlight.js/styles/github-dark-dimmed.css";
import "./styles.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div
      className="grid h-screen"
      style={{
        gridTemplateRows: "auto 1fr auto",
      }}
    >
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
      <header className="p-2 md:p-3 h-20 md:h-24 text-white bg-pantone-viva-magenta flex items-center print:hidden">
        <p className="text-xl md:text-2xl m-0">
          <a href="/">
            Hey there! I am <span className="text-4xl md:text-5xl font-thin">Celso Neto</span>
          </a>
        </p>
      </header>
      <div className="p-3 md:p-4 print:p-0">
        <Component {...pageProps} />
      </div>
      <footer className="p-2 md:p-3 h-20 text-white bg-pantone-viva-magenta flex items-center print:hidden">
        With love from Celso
      </footer>
    </div>
  );
};

export default MyApp;
