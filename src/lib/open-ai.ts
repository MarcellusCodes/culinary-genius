import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: "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",
});
const openAi = new OpenAIApi(configuration);

export default openAi;
