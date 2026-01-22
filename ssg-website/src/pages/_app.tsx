import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import "highlight.js/styles/github-dark-dimmed.css";
import "./styles.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    setMounted(true);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        html.classList.toggle("dark", e.matches);
        setTheme(e.matches ? "dark" : "light");
      }
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);
  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
    const newTheme = isDark ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };
  return (
    <div className="grid min-h-screen bg-white text-black dark:bg-gray-950 dark:text-white grid-rows-[auto_1fr_auto]">
      <Head>
        {}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function () {
              try {
                const savedTheme = localStorage.getItem("theme");
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                let theme = prefersDark ? "dark" : "light";
                if (savedTheme === "dark" || savedTheme === "light") {
                  theme = savedTheme;
                }
                if (theme === "dark") {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
              } catch (e) {}
            })();
            `,
          }}
        />
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
      <header className="p-2 md:p-3 h-20 md:h-24 flex items-center justify-between bg-pantone-viva-magenta dark:bg-pantone-ultra-violet text-white print:hidden">
        <p className="text-xl md:text-2xl m-0">
          <a href="/">
            Hey there! I am{" "}
            <span className="text-4xl md:text-5xl font-thin">Celso Neto</span>
          </a>
        </p>
        {}
        <button
          onClick={toggleTheme}
          className="ml-4 px-3 py-2 rounded bg-white text-black dark:bg-gray-800 dark:text-white hover:opacity-80 transition"
        >
          {mounted ? (theme === "dark" ? "Light Mode" : "Dark Mode") : null}
        </button>
      </header>
      <main className="p-3 md:p-4 print:p-0">
        <Component {...pageProps} />
      </main>
      <footer className="p-2 md:p-3 h-20 bg-pantone-viva-magenta dark:bg-pantone-ultra-violet text-white flex items-center print:hidden">
        With love from Celso
      </footer>
    </div>
  );
};
export default MyApp;

