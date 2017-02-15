const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First todo from test'
}, {
    _id: new ObjectID(),
    text: 'Second todo from test',
    completed: false,
    completedAt: 123
}]

console.log(todos[0]._id)

//Clean out the database before each test
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done());
})

describe('POST /todos', () => {
    it('should create new todo', (done) => {
        let text = 'Test todo test 1';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => done(err));
            })
    });

    it('should not create todo with invalid body data', (done) => {
        let text = '';

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err) => done(err));
            })
    })
})

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect(res => {
                expect(res.body.todos.length).toBe(2)
            })
            .end(done);
    })
})

describe('GET /todos/:id', () => {
    it('should get a todo', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done)
    });

    it('shoud return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done)
    })

    it('shoud return 404 if invalid id', (done) => {
        request(app)
            .get(`/todos/123abc`)
            .expect(404)
            .end(done)
    })

})

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var id = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(id)
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(id).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((err) => done(err));
            })
    })

    it('should return 404 if todo not found', (done) => {
        request(app)
            .delete(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done)
    })

    it('should return 404 if id is invalid', (done) => {
        request(app)
            .delete(`/todos/123abc`)
            .expect(404)
            .end(done)
    })
})

describe('PATCH /todos/:id', () => {
    it('should update a todo', (done) => {
        var id = todos[1]._id.toHexString();
        var body = {
            completed: true,
            text: 'updated by test'
        }
        request(app)
            .patch(`/todos/${id}`)
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(body.text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done)
    })

    it('should set createdAt to null if completed is false', (done) => {
        var id = todos[1]._id.toHexString();
        var body = {
            completed: false,
            text: 'updated by test 2'
        }
        request(app)
            .patch(`/todos/${id}`)
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(body.text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist()
            })
            .end(done)
    })
})
