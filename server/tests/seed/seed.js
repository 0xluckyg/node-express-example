const {ObjectID} = require('mongodb');
const {Todo} = require('../../models/todo');
const {User} = require('../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    name: 'User1',
    _id: userOneId,
    email: 'user1@gmail.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({
            _id: userOneId,
            acces: 'auth',
        }, 'secret_salt').toString()
    }]
}, {
    name: 'User2',
    _id: userTwoId,
    email: 'user2@gmail.com',
    password: 'userTwoPass',
}]

const todos = [{
    _id: new ObjectID(),
    text: 'First todo from test',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'Second todo from test',
    completed: false,
    completedAt: 123,
    _creator: userTwoId
}]

const populateUsers = (done) => {
    User.remove({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

        //Takes in two promises, not going to call until all the specified promises are resolved
        return Promise.all([userOne, userTwo])
    }).then(() => done());
}

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done());
}

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
}
