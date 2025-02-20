import { OllamaEmbeddings } from "@langchain/ollama";

export default new OllamaEmbeddings({
  model: "mxbai-embed-large",
  baseUrl: "http://localhost:11434",
});
