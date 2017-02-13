const mongoose = require('mongoose');

//Tells mongoose we're using the built in promise
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

//Creating a new todo example
let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        //doesn't leave any white spaces
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

//Sets default completed to false, and completed at to null
let newTodo = new Todo({
    text: 'Make todo using mongoose'
});

newTodo.save().then((doc) => {
    console.log('saved todo', doc);
}, (err) => {
    console.log('unable to save todo');
});

let otherTodo = new Todo({
    text: 'Make todo using mongoose with all attributes',
    completed: false,
    completedAt: 123
});

otherTodo.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
    console.log('unable to save todo: ', err);
})

//Creating a new user example
let User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    }
})

let newUser = new User({
    name: 'Scott',
    email: 'scottsgcho@gmail.com'
})

newUser.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
    console.log('unable to save user: ', err);
})
