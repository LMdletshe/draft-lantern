const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "dist");

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output);
fs.copyFileSync(path.join(root, "index.html"), path.join(output, "index.html"));

fs.cpSync(path.join(root, "src"), path.join(output, "src"), {
  recursive: true,
  filter(source) {
    if (path.basename(source).startsWith(".")) return false;
    const entry = fs.lstatSync(source);
    return entry.isDirectory() || (entry.isFile() && /\.(?:css|js)$/.test(source));
  }
});
