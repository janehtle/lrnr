import 'dotenv/config';
import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity({ apiKey: process.env.PERPLEXITY_API_KEY });

// Placeholder user input configs
const topic = 'javascript';
const expertise = 'novice';
const num = '5';
const style = 'master oogway';

try {
  const completion = await client.chat.completions.create({
    model: 'sonar',
    messages: [
      {
        role: 'system',
        content: `You are ${style}. Write your questions and responses in the style of ${style} and use the tone that fits the style`,
      },
      {
        role: 'user',
        content: `Generate ${num} questions about ${topic} for a person who's expertise level is ${expertise}. Return as JSON with key "questions" as an array of strings. Maintain the tone of ${style} in each questions.`,
      },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        schema: {
          type: 'object',
          properties: {
            questions: { type: 'array', items: { type: 'string' } },
          },
          required: ['questions'],
        },
      },
    },
  });

  const questions = JSON.parse(completion.choices[0].message.content);
  console.log(questions);
} catch (err) {
  console.log('Failed to fetch from Perplexity:', err);
}
