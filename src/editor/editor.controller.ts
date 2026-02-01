import { Request, Response } from "express";
import { editorService } from "./editor.service";

export class EditorController {
  renderEditor(req: Request, res: Response): void {
    const document = editorService.getOrCreateSharedDocument();

    res.render("index", {
      title: "JodSpace - Collaborative Editor",
      document,
    });
  }

  getDocument(req: Request, res: Response): void {
    const document = editorService.getDocument();
    res.json({
      success: true,
      document,
    });
  }

  updateDocument(req: Request, res: Response): void {
    const { content } = req.body;
    editorService.updateDocument(content);
    res.json({
      success: true,
      message: "Document updated",
    });
  }
}

export const editorController = new EditorController();
