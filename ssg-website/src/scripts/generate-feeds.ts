import { generateAndWriteFeeds } from "../services/feed";

(async () => {
  console.log("Generating RSS + Atom feeds...");
  await generateAndWriteFeeds();
})();
