const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

var id = '5a9af8aa72b809129b34f5f5';

// Todo.find({
//   completed: false
// }).then((todos) => {
//   console.log('Todos:', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo:', todo);
// });

if (!ObjectID.isValid(id)) {
  return console.log('ID not valid');
}

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Todo not found');
  }
  console.log('Todo by ID:', todo);
}).catch((e) => {
  console.log(e);
});
