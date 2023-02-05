const express = require('express');
const fs = require('fs');
const rateLimit = require("express-rate-limit");

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const lines = fs.readFileSync('text-file.txt', 'utf-8').split('\n');

// Create a rate limiter that allows 1 request every 30 seconds
const limiter = rateLimit({
  windowMs: 180 * 1000,
  max: 1,
});

// Route to get a random line from the text file
app.get('/api/random-line', limiter, (req, res) => {
  const line = lines[Math.floor(Math.random() * lines.length)];
  res.json({ line });
});

app.listen(3000, () => {
  console.log('API listening on http://localhost:3000');
});