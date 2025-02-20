import express from "express";
import loadDocuments from "./services/fileLoader.js";
import { loadVectorStore } from "./models/vectorStore.js";
import chatRoutes from "./routes/chat.js";


import path from "path";
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.use("/chat", chatRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

// Khởi động server
const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
  await loadDocuments();
  await loadVectorStore();
});
