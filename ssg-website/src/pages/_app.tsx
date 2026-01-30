import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import "highlight.js/styles/github-dark-dimmed.css";
import "./styles.css";

type Theme = "light" | "dark";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [hasUserPreference, setHasUserPreference] = useState(false);
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
      setHasUserPreference(true);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme: Theme = systemPrefersDark ? "dark" : "light";
      setTheme(initialTheme);
      document.documentElement.classList.toggle("dark", initialTheme === "dark");
    }
  }, []);
  useEffect(() => {
    if (hasUserPreference) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
      document.documentElement.classList.toggle("dark", e.matches);
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [hasUserPreference]);
  const toggleTheme = () => {
    const newTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setHasUserPreference(true);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };
  return (
    <div className="grid min-h-screen text-black dark:text-white dark:bg-gray-950 bg-white grid-rows-[auto_1fr_auto]">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;400&display=swap"
          rel="stylesheet"
        />
        <title>Celso Palmeira Neto's HP</title>
      </Head>
      <header className="p-2 md:p-3 h-20 md:h-24 text-white bg-pantone-viva-magenta dark:bg-pantone-ultra-violet flex items-center justify-between print:hidden">
        <p className="text-xl md:text-2xl m-0">
          <a href="/">
            Hey there! I am{" "}
            <span className="text-4xl md:text-5xl font-thin">Celso Neto</span>
          </a>
        </p>
        {}
        <button
          onClick={toggleTheme}
          className="p-2 rounded bg-black/20 dark:bg-white/20"
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <div className="p-3 md:p-4 print:p-0">
        <Component {...pageProps} />
      </div>
      <footer className="p-2 md:p-3 h-20 text-white bg-pantone-viva-magenta dark:bg-pantone-ultra-violet flex items-center print:hidden">
        With love from Celso
      </footer>
    </div>
  );
};

export default MyApp;
