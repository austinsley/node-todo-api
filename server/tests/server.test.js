const {expect} = require('chai');
const request = require('supertest');

const {app} = require('../server.js');
const {Todo} = require('../models/todo');

const todos = [{
  text: 'first'
}, {
  text: 'second'
}, {
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
    request(app).post('/todos')
    .send({})
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
