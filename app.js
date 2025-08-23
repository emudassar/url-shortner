import express from "express";
import { readFile, writeFile } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFile = path.join(__dirname, "data", "links.json");

app.post("/shorten", (req, res) => {
  console.log("REQ.BODY:", req.body);
  readFile(dataFile, "utf8", (err, data) => {
    if (err) throw err;
    const savedData = data ? JSON.parse(data) : {};
    const { url, shortcode } = req.body;

    if (savedData[shortcode]) {
      return res.status(400).json({
        error: "Shortcode already exists. Choose another one.",
      });
    }

    savedData[shortcode] = url;

    const shortUrl = `http://localhost:3000/${shortcode}`;
    res.json({ shortUrl });

    writeFile(dataFile, JSON.stringify(savedData, null, 2), (err) => {
      if (err) throw err;
      console.log("Link saved: ", shortcode, "->", url);
    });
  });
});

app.get("/:shortcode", (req, res) => {
  const shortcode = req.params.shortcode;

  readFile(dataFile, "utf8", (err, data) => {
    if (err) throw err;
    const savedData = data ? JSON.parse(data) : {};

    const url = savedData[shortcode];
    if (url) {
      res.redirect(url);
    } else {
      res.status(404).send("Short link not found");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
