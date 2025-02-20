import { ChatPromptTemplate } from "@langchain/core/prompts";

const SYSTEM_TEMPLATE = `Sử dụng các thông tin sau đây để trả lời câu hỏi.
Nếu bạn không biết câu trả lời, chỉ cần nói "Tôi không biết", đừng cố đoán.
----------------
{context}`;

export const prompt = ChatPromptTemplate.fromMessages([
  ["system", SYSTEM_TEMPLATE],
  ["human", "{question}"],
]);

// Hàm định dạng tài liệu thành chuỗi
export const formatDocumentsAsString = (documents) => {
  return documents.map((doc) => doc.pageContent).join("\n\n");
};
