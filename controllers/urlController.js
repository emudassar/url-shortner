import { getLinks, saveLinks } from "../models/urlModel.js";

export function shortenUrl(req, res) {
  getLinks((err, savedData) => {
    if (err) throw err;
    const { url, shortcode } = req.body;

    if (!url || !shortcode) {
      return res.status(400).json({ error: "url and shortcode are required" });
    }

    if (savedData[shortcode]) {
      return res.status(400).json({ error: "Shortcode already exists" });
    }

    savedData[shortcode] = url;

    saveLinks(savedData, (wErr) => {
      if (wErr) throw wErr;
      const shortUrl = `http://localhost:3000/${shortcode}`;
      res.json({ shortUrl });
    });
  });
}

export function redirectUrl(req, res) {
  const shortcode = req.params.shortcode;
  getLinks((err, savedData) => {
    if (err) throw err;
    const url = savedData[shortcode];
    if (url) {
      return res.redirect(url);
    }
    res.status(404).send("Short link not found");
  });
}
