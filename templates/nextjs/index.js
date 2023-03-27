import "@ampt/nextjs/entrypoint";

// Welcome message for when the user visits the sandbox URL before building the app.
// This can be removed once the app is built.
import { http } from "@ampt/sdk";
import { readFileSync } from "fs";

http.use("/", () => {
  return new Response(readFileSync("welcome.html"), {
    status: 200,
    headers: { "content-type": "text/html", "cache-control": "no-cache" },
  });
});
// End welcome message
