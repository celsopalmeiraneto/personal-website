import { createNewPost } from "../services/posts";

(async () => {
  if (process.argv.length < 3) {
    console.error("Usage: create-post <slug>");
    return process.exit(1);
  }

  const result = await createNewPost(process.argv[2]);
  console.log("New post created:", result.fileName);
})();
