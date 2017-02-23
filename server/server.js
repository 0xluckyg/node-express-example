require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');

const _ = require('lodash');
const {ObjectID} = require('mongodb');
const mongoose = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate')

const port = process.env.PORT;

var app = express();

app.use(bodyParser.json());

//Get request, and save to database or return if error
app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        //send the doc back
        res.send(doc);
    }, (err) => {
        //send status back
        res.status(400).send(err);
    })
})

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    })
})

// GET /todos/dynamic
app.get('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            console.log('TODO:',todo);
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err) => {
        console.log(err)
        res.status(400).send(err);
    });

})

// DELETE /todos/dynamic
app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }, (err) => {
        res.status(400).send(err);
    })
})

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    //first is id to find, second is data to set, third is what to return
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }
        res.send({todo});
    }).catch((err) => {
        res.status(400).send()
    })
})

//SIGNUP This is for signup only, because logging in is not accepted due to duplicate email.
app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['name', 'email', 'password']);
    let user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

//LOGIN, to generate another x-auth token
app.post('/users/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password'])
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((err) => {
        res.status(400).send();
    })
})

//GET USER, call middleware
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
})

//LOGOUT, deleting user token
app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
})

app.listen(port, () => {
    console.log('Started on port: ', port);
});

module.exports = {
    app: app
}
