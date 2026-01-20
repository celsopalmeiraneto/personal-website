/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ESSENCIAL para o botão funcionar
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "pantone-viva-magenta": "#bb2649",
        "pantone-ultra-violet": "#5f4b8b",
      },
    },
  },
  plugins: [],
};
