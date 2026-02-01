import express, { Request, Response } from "express";
import path from "path";
import editorRoutes from "./editor/editor.routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
// Use 'src/public' for development (ts-node) or 'dist/public' for production
const publicPath = path.join(__dirname, "..", "src", "public");
app.use(express.static(publicPath));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", editorRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
