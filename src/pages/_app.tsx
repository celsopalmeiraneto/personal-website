import "normalize.css";
import "./styles.scss";
import styles from "./_app.module.scss";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div id={styles.mainContainer}>
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
