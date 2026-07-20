import fs from "node:fs/promises";
import path from "node:path";

async function symlinkPostAssets() {
  const postsDir = path.resolve("..", "data", "posts");
  const publicPostsDir = path.resolve("public", "posts");

  try {
    await fs.readdir(postsDir);
  } catch {
    return;
  }

  const entries = await fs.readdir(postsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("_")) continue;

    const assetPath = path.resolve(postsDir, entry.name);
    const publicPath = path.resolve(publicPostsDir, entry.name);

    try {
      await fs.unlink(publicPath);
    } catch {
      // doesn't exist, fine
    }

    await fs.mkdir(path.dirname(publicPath), { recursive: true });
    const relativeAssetPath = path.relative(path.dirname(publicPath), assetPath);
    await fs.symlink(relativeAssetPath, publicPath, "dir");
    console.log(`Symlinked post assets: ${entry.name}`);
  }
}

export function mermaidPlugin() {
  return {
    name: "mermaid-and-assets",
    hooks: {
      "astro:config:setup": async () => {
        console.log("Copying mermaid.js to public/scripts/...");
        const source = path.resolve("..", "node_modules", "mermaid", "dist", "mermaid.min.js");
        const destDir = path.resolve("public", "scripts");
        const dest = path.resolve(destDir, "mermaid.min.js");
        await fs.mkdir(destDir, { recursive: true });
        try {
          await fs.copyFile(source, dest);
          console.log("mermaid.min.js copied successfully.");
        } catch (e) {
          console.error("Failed to copy mermaid.min.js:", e);
        }

        console.log("Setting up post asset symlinks...");
        await symlinkPostAssets();
      },
    },
  };
}
