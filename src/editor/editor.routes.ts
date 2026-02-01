import { Router } from "express";
import { editorController } from "./editor.controller";

const router = Router();

router.get("/", editorController.renderEditor);
router.get("/api/document", editorController.getDocument);
router.put("/api/document", editorController.updateDocument);
export default router;
