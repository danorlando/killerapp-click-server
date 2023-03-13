import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function createChatService(prompt: string) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    temperature: 0.5,
    max_tokens: 125,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.data.choices[0]!.text;
}

export default { createChatService };
