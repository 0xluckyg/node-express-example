require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');

const _ = require('lodash');
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo.js');
const {User} = require('./models/user.js');

const port = process.env.PORT;

var app = express();

app.use(bodyParser.json());

//Get request, and save to database or return if error
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    console.log(req.body);

    todo.save().then((doc) => {
        //send the doc back
        res.send(doc);
    }, (err) => {
        //send status back
        res.status(400).send(err);
    })
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    })
})

// GET /todos/dynamic
app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }
        res.send({todo});
    }, (err) => {
        res.status(400).send(err);
    })
})

// DELETE /todos/dynamic
app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
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
        res.status(404).send();
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

app.listen(port, () => {
    console.log('Started on port: ', port);
});

module.exports = {
    app: app
}
