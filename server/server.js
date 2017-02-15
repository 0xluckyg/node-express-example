const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo.js');
const {User} = require('./models/user.js');

const port = process.env.PORT || 3000;

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

app.listen(port, () => {
    console.log('Started on port: ', port);
});

module.exports = {
    app: app
}
