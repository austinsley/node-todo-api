const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

// POST /todos
app.post('/todos', (req, res) => {
  var todo = Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// TODO: add GET /todos/${_id}

app.listen(3000, () => {
  console.log('Started on port 3000');
});
