import { FaissStore } from "@langchain/community/vectorstores/faiss";
import embeddings from "./embeddings.js";

const FAISS_PATH = "src/db/faiss";
let vectorStore;

const loadVectorStore = async () => {
  try {
    vectorStore = await FaissStore.load(FAISS_PATH, embeddings);
    console.log("✅ Vector Store đã được load thành công!");
  } catch (error) {
    console.error("❌ Lỗi khi load Vector Store:", error);
  }
};

export { vectorStore, loadVectorStore };
