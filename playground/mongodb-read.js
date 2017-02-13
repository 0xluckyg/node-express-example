const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server')

    //Finding data
    db.collection('Todos').find({
        completed: true
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch Todos: ', err);
    })

    //Counting data
    db.collection('Todos').find({
        completed: true
    }).count().then((count) => {
        console.log('Todos count:', count);
    }, (err) => {
        console.log('Unable to fetch Todos: ', err);
    })

    db.close();
});
