const express = require('express');
const app = express();
const path = require('path');
const solveCube = require('./solve.js');

app.use(express.static(path.join(__dirname, '.')));

app.get('/solve', (req, res) => {
    let state = req.query.state;
    let moves = solveCube(state);
    res.json(moves);
});

app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});
