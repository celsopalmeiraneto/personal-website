import { chromium, type Browser } from "playwright";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { lookup } from "node:mime-types";
import { statSync } from "node:fs";
import { mkdir, readFile } from "node:fs/promises";

const VIEWPORTS = {
  mobile: { width: 375, height: 812 },
  desktop: { width: 1280, height: 900 },
};

const ROUTES = [
  { path: "/", name: "home" },
  { path: "/posts", name: "posts" },
  { path: "/posts/ai-writing", name: "post-ai-writing" },
  { path: "/resumes/en-US", name: "resume-en" },
  { path: "/resumes/pt-BR", name: "resume-pt" },
  { path: "/uses", name: "uses" },
];

function startStaticServer(baseDir: string, port: number): Promise<{ close: () => Promise<void> }> {
  const MIME: Record<string, string> = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".xml": "application/xml",
    ".rss": "application/rss+xml",
    ".atom": "application/atom+xml",
  };

  const getMime = (name: string): string => {
    const ext = name.slice(name.lastIndexOf("."));
    return MIME[ext] || "application/octet-stream";
  };

  return new Promise((resolvePromise) => {
    const server = createServer((req, res) => {
      let urlPath = req.url?.split("?")[0] || "/";

      const tryServe = (filePath: string): boolean => {
        try {
          if (!statSync(filePath).isFile()) return false;
          const content = readFileSync(filePath);
          const ext = filePath.slice(filePath.lastIndexOf("."));
          res.setHeader("Content-Type", getMime(ext));
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.end(content);
          return true;
        } catch {
          return false;
        }
      };

      if (urlPath.endsWith("/")) {
        urlPath += "index.html";
      }

      const filePath = join(baseDir, urlPath);

      if (tryServe(filePath)) return;
      if (tryServe(filePath + ".html")) return;
      if (tryServe(join(filePath, "index.html"))) return;

      res.statusCode = 404;
      res.end("Not Found");
    });

    server.listen(port, () => {
      resolvePromise({
        close: () => new Promise<void>((r) => server.close(() => r())),
      });
    });
  });
}

async function captureScreenshots(baseDir: string, outputDir: string) {
  const port = 4567;
  const server = await startStaticServer(baseDir, port);
  console.log(`Serving ${baseDir} on http://localhost:${port}`);

  const browser = await chromium.launch();
  const context = await browser.newContext();

  await mkdir(outputDir, { recursive: true });

  for (const route of ROUTES) {
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      const page = await context.newPage();
      await page.setViewportSize(viewport);

      const url = `http://localhost:${port}${route.path}`;
      console.log(`Capturing ${route.name} @ ${viewportName} (${url})`);

      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });
        await page.waitForTimeout(500);

        const filename = `${route.name}-${viewportName}.png`;
        const outputPath = join(outputDir, filename);
        await page.screenshot({ path: outputPath, fullPage: true });
        console.log(`  -> ${filename}`);
      } catch (err) {
        console.error(`  -> FAILED: ${err}`);
      } finally {
        await page.close();
      }
    }
  }

  await browser.close();
  await server.close();
  console.log("Done.");
}

async function main() {
  const args = process.argv.slice(2);
  const dirFlag = args.indexOf("--dir");
  const outputFlag = args.indexOf("--output");

  if (dirFlag === -1 || outputFlag === -1) {
    console.error(
      "Usage: npx tsx scripts/capture-screenshots.ts --dir <build-dir> --output <screenshots-dir>",
    );
    process.exit(1);
  }

  const baseDir = resolve(args[dirFlag + 1]);
  const outputDir = resolve(args[outputFlag + 1]);

  await captureScreenshots(baseDir, outputDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
