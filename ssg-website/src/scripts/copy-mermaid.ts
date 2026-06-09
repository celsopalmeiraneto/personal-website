import fs from "node:fs/promises";
import path from "node:path";

(async () => {
  console.log("Copying mermaid.js to public/scripts/...");

  const source = path.resolve("..", "node_modules", "mermaid", "dist", "mermaid.min.js");
  const destDir = path.resolve("public", "scripts");
  const dest = path.resolve(destDir, "mermaid.min.js");

  await fs.mkdir(destDir, { recursive: true });
  await fs.copyFile(source, dest);

  console.log("mermaid.min.js copied successfully.");
})();
