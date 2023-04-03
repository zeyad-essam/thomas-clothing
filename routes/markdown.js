import { Router } from "express";

import * as markdownController from "../controllers/markdown.js";

const router = Router();

router.get("/get-markdown", markdownController.getMarkdown);

export default router;
