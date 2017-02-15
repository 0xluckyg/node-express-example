const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

let id = '58a3bba485d5bb064319aedb';

if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
}

Todo.find({
    _id: id
}).then((todos) => {
    console.log(todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log(todo);
})

Todo.findById(id).then((todos) => {
    if (!todo) {
        return
    }
    console.log('Todo by Id', todos);
}).catch((err) => {
    console.log(err)
})
