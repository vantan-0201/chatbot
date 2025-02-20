import { ChatOllama } from "@langchain/ollama";

export default new ChatOllama({
  model: "llama3.2",
  temperature: 0,
  maxRetries: 2,
});
