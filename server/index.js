/* server folder will be for Node + Express
fulfill requirement for refactoring code to Node.js
already installed npm: express, cors, dotenv -JL */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

/* test app - run node server.js in terminal to check if it runs
update: it works/runs! may need second pair of eyes to confirm -JL */
const app = express();
app.use(cors());
app.use(express.json());
app.get('/api/health', (req, res) => res.json({ ok: true }));

//placeholder route
app.post('/api/quiz', (req, res) =>
  res.json({ message: 'Perplexity integration pending' })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Running on server ${PORT}`));
