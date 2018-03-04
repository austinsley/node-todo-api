const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

// Todo.remove({}).then((res) => {
//   console.log(res);
// });

// Todo.findOneAndRemove()

Todo.findByIdAndRemove('5a9c40e884736df72711b091').then((todo) => {
  console.log(todo);
});
