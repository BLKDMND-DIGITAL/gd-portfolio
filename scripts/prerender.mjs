import { createServer } from "vite";
import { readFileSync, writeFileSync } from "node:fs";

const marker = "<!--app-->";
const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const loaded = await vite.ssrLoadModule("/src/entry-server.tsx");
  const appHtml = loaded.render();
  const template = readFileSync("dist/index.html", "utf8");
  if (!template.includes(marker)) {
    throw new Error("Prerender marker missing from dist/index.html");
  }
  writeFileSync("dist/index.html", template.replace(marker, appHtml));
} finally {
  await vite.close();
}
