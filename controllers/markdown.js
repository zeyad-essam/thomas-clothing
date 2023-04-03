import path from "path";
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

import fs from "fs/promises";
import grayMatter from "gray-matter";

export const getMarkdown = async (req, res, next) => {
  try {
    const { fileName } = req.query;
    const filePath = path.join(__dirname, "..", "markdown", fileName + ".md");
    const fileContent = await fs.readFile(filePath);
    const { content } = grayMatter(fileContent);

    res.status(200).json({ success: true, content });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
