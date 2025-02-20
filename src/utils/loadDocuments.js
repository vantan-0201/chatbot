import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const ACCESS_PATH = "src/assets/";

export async function loadAndSplitDocuments() {
  console.log("🔄 Đang tải dữ liệu từ PDF...");

  // Load tất cả PDF trong thư mục
  const directoryLoader = new DirectoryLoader(ACCESS_PATH, {
    ".pdf": (path) => new PDFLoader(path),
  });

  const directoryDocs = await directoryLoader.load();
  console.log("✅ Tải xong PDF:", directoryDocs.length, "tài liệu");

  // Chia nhỏ tài liệu
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const splitDocs = await splitter.splitDocuments(directoryDocs);
  console.log("✅ Chia nhỏ tài liệu xong:", splitDocs.length, "đoạn");

  return splitDocs;
}
