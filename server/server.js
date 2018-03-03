const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

// var otherTodo = new Todo({
//   text: 'Eat dinner',
//   completed: true,
//   completedAt: 123456
// });
//
//
// otherTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo');
// });

var newUser = new User({
  email: '    test@website.com    '
});

newUser.save().then((doc) => {
  console.log('Saved user', doc);
}, (err) => {
  console.log('Unable to save user');
})
