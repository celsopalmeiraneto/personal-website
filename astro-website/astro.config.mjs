// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { mermaidPlugin } from "./src/scripts/copy-mermaid";
import { feedPlugin } from "./src/services/feed";

// https://astro.build/config
export default defineConfig({
  site: "https://celsoneto.com.br",
  integrations: [react(), mermaidPlugin(), feedPlugin()],
  vite: {
    plugins: [tailwindcss()],
  },
});
