const {expect} = require('chai');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server.js');
const {Todo} = require('../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'first'
}, {
  _id: new ObjectID(),
  text: 'second',
  completed: true,
  completedAt: 12345
}, {
  _id: new ObjectID(),
  text: 'third'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'asdf';

    request(app).post('/todos').send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).to.equal(text);
    }).end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find().then((todos) => {
        expect(todos.length).to.equal(4);
        expect(todos[3].text).to.equal(text);
        done();
      }).catch((e) => done(e));
    });
  });

  it('should not accept invalid body data', (done) => {
    request(app).post('/todos').send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find().then((todos) => {
        expect(todos.length).to.equal(3);
        done();
      }).catch((e) => done(e));
    });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app).get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).to.equal(3);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return a todo doc', (done) => {
    request(app).get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).to.equal(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var testID = new ObjectID().toHexString();

    request(app).get(`/todos/${testID}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-ObjectIDs', (done) => {
    request(app).get('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should delete a todo doc', (done) => {
    var testID = todos[0]._id.toHexString();

    request(app).delete(`/todos/${testID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).to.equal(testID);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.findById(testID).then((todo) => {
          expect(todo).to.be.null;
          done();
        }).catch((e) => done(e));

      });
  });

  it('should return 404 if todo not found', (done) => {
    var testID = new ObjectID().toHexString();

    request(app).delete(`/todos/${testID}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-ObjectIDs', (done) => {
    request(app).delete('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update a todo', (done) => {
    var testID = todos[0]._id.toHexString();
    var text = 'This text has been updated';

    request(app).patch(`/todos/${testID}`)
    .send({
      text,
      completed: true
    })
    .expect(200)
    .expect((res) => {
      var todo = res.body.todo;
      expect(todo.text).to.equal(text);
      expect(todo.completed).to.equal(true);
      expect(todo.completedAt).to.be.a('number');
      done();
    }).catch((e) => done(e));
  });

  it('should clear completedAt when completed becomes false', (done) => {
    var testID = todos[1]._id.toHexString();
    var text = 'This text has been updated too!';

    request(app).patch(`/todos/${testID}`)
    .send({
      text,
      completed: false
    })
    .expect(200)
    .expect((res) => {
      var todo = res.body.todo;
      expect(todo.text).to.equal(text);
      expect(todo.completed).to.equal(false);
      expect(todo.completedAt).to.be.null;
      done();
    }).catch((e) => done(e));
  });
});
