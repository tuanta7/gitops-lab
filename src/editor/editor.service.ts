export interface EditorDocument {
  content: string;
  updatedAt: Date;
}

export class EditorService {
  private sharedDocument: EditorDocument;

  constructor() {
    this.sharedDocument = {
      content: "",
      updatedAt: new Date(),
    };
  }

  getOrCreateSharedDocument(): EditorDocument {
    return this.sharedDocument;
  }

  getDocument(): EditorDocument {
    return this.sharedDocument;
  }

  updateDocument(content: string): boolean {
    this.sharedDocument.content = content;
    this.sharedDocument.updatedAt = new Date();
    return true;
  }
}

export const editorService = new EditorService();
