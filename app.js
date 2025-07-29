import { readFile } from "fs/promises";
import { createServer } from "http";
import path from "path";
import crypto from "crypto"

const PORT = 3001;

const serveFile = async (res, filePath, contentType) => {
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "content-type": contentType });
    res.end(data);
  } catch (error) {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("404 page not found");
  }
};

const server = createServer(async (req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      return serveFile(res, path.join("public", "index.html"), "text/html");
    } else if (req.url === "/style.css") {
      return serveFile(res, path.join("public", "style.css"), "text/css");
    }
  }

  if (req.method === "POST" && req.url === "/shorten") {
    const body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.end("end", () => {
      const { url, shortcode } = JSON.parse(body);
      if (!url) {
        res.writeHead("400", { "content-type": "text/plain" });
        return res.end("URL is required");
      }

      const finalShortCode = shortcode || crypto.randomBytes(4).toString("hex")

    });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
