var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

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
