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

const questions = [];
let topic = '';
let expertise = '';
let num = '';
let style = '';
//placeholder route
app.post('/api/quiz', async (req, res) => {
  // Placeholder user input configs
  //   topic = 'jquery';
  //   expertise = 'intermediate';
  //   num = '5';
  //   style = 'master oogway';

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
  // QUESTION: Should frontend devs POST the fetched question OR should I just get it from above? If I get it from the questions variable, would I have to make it into a global variable? How would I ensure I get the correct question in the array?
  const question = questions[0];
  const answer = 'Javascript is lit, but JQuery is even more lit';

  if (!answer) {
    res.json({ error: 'No answer submitted' });
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
