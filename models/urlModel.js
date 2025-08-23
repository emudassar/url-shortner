import { readFile, writeFile } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFile = path.join(__dirname, "..", "data", "links.json");

export function getLinks(callback) {
  readFile(dataFile, "utf8", (err, data) => {
    if (err) return callback(err, null);
    const savedData = data ? JSON.parse(data) : {};
    callback(null, savedData);
  });
}

export function saveLinks(links, callback) {
  writeFile(dataFile, JSON.stringify(links, null, 2), callback);
}
