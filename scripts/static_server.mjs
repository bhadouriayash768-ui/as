import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../vercel-dist");
const port = Number(process.env.PORT || 4173);
const server = createServer(async (req, res) => {
  const raw = decodeURIComponent((req.url || "/").split("?")[0]);
  const candidates = raw === "/" ? [path.join(root, "index.html")] : [path.join(root, raw, "index.html"), path.join(root, raw.slice(1))];
  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (!info.isFile()) continue;
      const body = await readFile(candidate);
      const type = candidate.endsWith(".html") ? "text/html; charset=utf-8" : candidate.endsWith(".xml") ? "application/xml" : candidate.endsWith(".txt") ? "text/plain; charset=utf-8" : "application/octet-stream";
      res.writeHead(200, { "Content-Type": type });
      res.end(body);
      return;
    } catch {}
  }
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
});
server.listen(port, () => console.log(`Static server listening on ${port}`));
