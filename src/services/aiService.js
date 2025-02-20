import model from "../models/chatModel.js";
import { loadVectorStore, vectorStore } from "../models/vectorStore.js";
import { prompt, formatDocumentsAsString } from "../utils/prompt.js";

export async function askAI(question) {

    if (!vectorStore) {
        console.error("❌ vectorStore chưa được load. Đang thử load lại...");
        await loadVectorStore();
      }
    
      if (!vectorStore) {
        console.error("❌ Không thể load Vector Store.");
        return "Lỗi hệ thống: Không thể truy cập dữ liệu.";
      }

    console.log("🔍 Đang tìm dữ liệu liên quan...");
    const retriever = vectorStore.asRetriever();
    const docs = await retriever.invoke(question);
  
    if (docs.length === 0) {
      return "❌ Không tìm thấy dữ liệu phù hợp.";
    }
  
    console.log("✅ Tìm thấy", docs.length, "tài liệu liên quan.");
    const context = formatDocumentsAsString(docs);
    const formattedPrompt = await prompt.format({ context, question });
  
    console.log("🤖 Đang gọi AI...");
    const answer = await model.invoke(formattedPrompt);
  
    return answer;
  
}
