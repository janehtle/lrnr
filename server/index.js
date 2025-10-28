/* server folder will be for Node + Express
fulfill requirement for refactoring code to Node.js
already installed npm: express, cors, dotenv -JL */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { fetchQuestions, validateAnswer } = require('./utils/perplexity');

/* test app - run node server.js in terminal to check if it runs
update: it works/runs! may need second pair of eyes to confirm -JL */
const app = express();
app.use(cors());
app.use(express.json());
app.get('/api/health', (req, res) => res.json({ ok: true }));

let topic = '';
let expertise = '';
let num = '';
let style = '';

app.post('/api/quiz', async (req, res) => {
  topic = req.body.topic;
  expertise = req.body.expertise;
  num = req.body.num;
  style = req.body.style;

  if (!topic && !expertise && !num && !style)
    res.json({
      error:
        'No topic, expertise, number of questions, and style of questions selected',
    });

  try {
    const questions = await fetchQuestions(topic, expertise, num, style);
    console.log(questions);
    res.json(questions);
  } catch (err) {
    res.json({ error: 'Failed to run fetchQuestions' });
  }
});

app.post('/api/answer', async (req, res) => {
  const answer = req.body.answer;
  const question = req.body.question;
  if (!answer) {
    res.json({ error: 'No answer submitted' });
  }
  if (!question) {
    res.json({ error: 'Provided the question the answer is submitted for' });
  }

  try {
    const response = await validateAnswer(style, question, answer);
    res.json(response);
  } catch (err) {
    res.json({ error: 'Failed to run validateAnswer' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Running on server ${PORT}`));
