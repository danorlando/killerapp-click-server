import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function createChatService(prompt: string, model: string) {
  let engine = model;
  if (!engine || engine === '') {
    engine = 'text-davinci-003';
  }
  const response = await openai.createCompletion({
    model: engine,
    prompt,
    temperature: 0.5,
    max_tokens: 125,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.data.choices[0]!.text;
}

export async function getOpenAIModelsService() {
  const response = await openai.listEngines();
  return response.data;
}

export default { createChatService, getOpenAIModelsService };
