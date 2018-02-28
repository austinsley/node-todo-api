const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to db server');
  }

  console.log('Connected to db server');
  const db = client.db('TodoApp');

  // db.collection('Users').insertOne({
  //   name: 'Austin',
  //   age: 20,
  //   location: 'Chapel Hill'
  // }, (err, res) => {
  //     if (err) {
  //       return console.log('Unable to insert user', err)
  //     }
  //
  //     console.log(JSON.stringify(res.ops[0]._id.getTimestamp()));
  // });

  client.close();
});
