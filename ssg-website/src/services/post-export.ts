import { generateAndWriteFeed } from "./rss";

(async () => {
  console.log("Generating RSS Feed...");
  await generateAndWriteFeed();
})();
