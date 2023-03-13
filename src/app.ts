import 'express-async-errors';

// import { PrismaClient } from '@prisma/client';
import express, { json } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Configuration, OpenAIApi } from 'openai';
// import helmet from 'helmet';

const app = express();
app.use(json());
// app.use(helmet());

// const prisma = new PrismaClient();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
// @ts-ignore
const ChatGPTFunction = async (titles, length, temperature) => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    // prompt: `Generate a list of ${length} songs from different artists similar to ${titles}, ordered by relative similarity. I do not have to know how you came up with the answer.`,
    prompt: `Create a valid JSON array of ${length} songs from different artists similar to ${titles}, ordered by relative similarity using this as a model:
            [{ "title": title, "artist": artist}]. Do not include line breaks. Do not escape the double quotes. Do not return any non-json text or numbering. The output should be an array of valid JSON objects.`,
    temperature: temperature || 0.5,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  // @ts-ignore
  return response.data.choices[0].text;
};

app.options('/*', (_, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  res.send(200);
});

app.get('/', (_, res) => {
  res.json({
    msg: 'Hello World',
  });
});

app.post('/song', async (req, res) => {
  const { titles, length, temperature } = req.body;

  if (titles && typeof titles !== 'string') {
    res.status(400).json({ error: '"song" must be a string' });
  }
  if (length && typeof length !== 'number') {
    res.status(400).json({ error: '"length" must be a number' });
  }

  const suggestions = await ChatGPTFunction(titles, length, temperature);

  if (!suggestions) {
    return res.status(500).json({ error: 'Unable to contact ChatGPT server' });
  }
  JSON.parse(suggestions);
  return res.status(200).json({ suggestions });
});

// app.post("/artist", async function (req, res) {
//   const { artist } = req.body;
//   if (artist && typeof artist !== "string") {
//     res.status(400).json({ error: '"artist" must be a string' });
//   }
// })

// app.post("/genre", async function (req, res) {
//   const { genre } = req.body;
//   if (genre && typeof genre !== "string") {
//     res.status(400).json({ error: '"genre" must be a string' });
//   }
// });

// app.get('/prisma', async (_, res) => {
//   await prisma.user.create({
//     data: {
//       email: 'random@example.com',
//     },
//   });

//   res.json({
//     msg: 'Add a new unique user without duplicate',
//   });
// });

app.use((_, res, _2) => {
  res.status(404).json({ error: 'NOT FOUND' });
});

export { app };
