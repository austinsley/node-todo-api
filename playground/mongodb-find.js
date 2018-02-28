const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to db server');
  }

  console.log('Connected to db server');
  const db = client.db('TodoApp');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5a9587541b7edd2da30d7426')
  // }).toArray().then((docs) => {
  //   console.log('Todos:');
  //   console.log(JSON.stringify(docs, undefined, 2))
  // }, (err) => {
  //   console.log('Unable to fetch data');
  // });

  // db.collection('Users').find().count().then((count) => {
  //   console.log(`Todos: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch data');
  // });

  db.collection('Users').find({
    name: 'Austin'
  }).count().then((count) => {
    console.log(`Users: ${count}`);
  }, (err) => {
    console.log('Unable to fetch data');
  });

  // client.close();
});
