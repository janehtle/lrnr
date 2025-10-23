//server folder will be for Node + Express
//fulfill requirement for refactoring code to Node.js
//already installed npm: express, cors, dotenv

const express = require("express");
const cors = require("cors");

//test app - run node server.js in terminal to check if it runs
//update: it works/runs!
const app = express();
app.use(cors());
app.use(express.json());
app.get("/api/health", (req, res)=> res.json({ok:true}));
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`Running on server ${PORT}`));
