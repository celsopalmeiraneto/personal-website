import "normalize.css";
import "./styles.scss";
import styles from "./_app.module.scss";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div id={styles.mainContainer}>
      <header id={styles.header}>
        <p>Hey there! I am</p>
        <h1>Celso Neto</h1>
      </header>
      <div id={styles.pageContent}>
        <Component {...pageProps} />
      </div>
      <footer id={styles.footer}>With love from Celso</footer>
    </div>
  );
};

export default MyApp;
