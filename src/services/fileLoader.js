import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import embeddings from "../models/embeddings.js";

const ACCESS_PATH = "src/assets/";
const FAISS_PATH = "src/db/faiss";

const loadDocuments = async () => {
  console.log("🔄 Đang tải dữ liệu từ PDF...");
  const directoryLoader = new DirectoryLoader(ACCESS_PATH, {
    ".pdf": (path) => new PDFLoader(path),
  });

  const docs = await directoryLoader.load();
  console.log("✅ Tải xong PDF:", docs.length, "tài liệu");

  // Chia nhỏ tài liệu
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const splitDocs = await splitter.splitDocuments(docs);
  console.log("✅ Chia nhỏ tài liệu xong:", splitDocs.length, "đoạn");

  // Lưu vào Vector Store
  const vectorStore = new FaissStore(embeddings, {});
  await vectorStore.addDocuments(splitDocs);
  await vectorStore.save(FAISS_PATH);
  console.log("✅ Đã thêm tài liệu vào Vector Store!");
};

export default loadDocuments;
