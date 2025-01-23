import { generateAndWriteFeed } from "../services/rss";

(async () => {
  console.log("Generating RSS Feed...");
  await generateAndWriteFeed();
})();
