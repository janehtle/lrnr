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

    const generatedQuestions = JSON.parse(
      completion.choices[0].message.content
    );

    return generatedQuestions.questions;
  } catch (err) {
    console.log('Failed to fetch questions from Perplexity:', err);
  }
};

const validateAnswer = async (style, question, answer) => {
  try {
    const completion = await client.chat.completions.create({
      model: 'sonar',
      messages: [
        {
          role: 'system',
          content: `You are ${style}. Write your responses in the style of ${style} and use the tone that fits the style`,
        },
        {
          role: 'user',
          content: `Check if ${answer} is the correct answer to ${question}. Reply with JSON { validity: "Incorrect" OR "Correct", explanation: "..." }. Maintain the tone of ${style} 
          in your explanation and avoid any brackets and numbers that are not part of the explanation. Additionally, limit explanation to 3 or 4 sentences`,
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          schema: {
            type: 'object',
            properties: {
              validity: { type: 'string' },
              explanation: { type: 'string' },
            },
            required: ['validity', 'explanation'],
          },
        },
      },
    });

    const response = JSON.parse(completion.choices[0].message.content);

    return response;
  } catch (err) {
    console.log('Failed to fetch answer validation from Perplexity:', err);
  }
};

module.exports = { fetchQuestions, validateAnswer };
