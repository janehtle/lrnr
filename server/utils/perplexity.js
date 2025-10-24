require('dotenv').config();
const Perplexity = require('@perplexity-ai/perplexity_ai');

const client = new Perplexity({ apiKey: process.env.PERPLEXITY_API_KEY });

const fetchQuestions = async (topic, expertise, num, style) => {
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

    return questions;
  } catch (err) {
    console.log('Failed to fetch from Perplexity:', err);
  }
};

module.exports = fetchQuestions;
