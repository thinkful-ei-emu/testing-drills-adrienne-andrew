const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));

/**
 * HOME
 */
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

/**
 * SUM 
 */
app.get('/sum', (req, res) => {
  const { a, b } = req.query;
  if (!a) {
    return res
      .status(400)
      .send('Value for a is needed');
  }

  if (!b) {
    return res
      .status(400)
      .send('Value for b is needed');
  }

  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (Number.isNaN(numA)) {
    return res
      .status(400)
      .send('Value for a must be numeric');
  }

  if (Number.isNaN(numB)) {
    return res
      .status(400)
      .send('Value for b must be numeric');
  }

  if (numB == 0) {
    return res
      .status(400)
      .send('Cannot divide by 0');
  }

  const ans = numA / numB;

  res
    .send(`${a} divided by ${b} is ${ans}`);

});

/**
 * FREQUENCY
 */
app.get('/frequency', (req, res) => {
  const { s } = req.query;

  if (!s) {
    return res
      .status(400)
      .send('Invalid Request');
  }

  const counts = s
    .toLowerCase()
    .split('')
    .reduce((acc, curr) => {
      if (acc[curr]) {
        acc[curr]++;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});

  const unique = Object.keys(counts).length;
  const average = s.length / unique;
  let highest = '';
  let highestVal = 0;

  Object.keys(counts).forEach(k => {
    if (counts[k] > highestVal) {
      highestVal = counts[k];
      highest = k;
    }
  });

  counts.unique = unique;
  counts.average = average;
  counts.highest = highest;
  res.json(counts);
});

module.exports = app;