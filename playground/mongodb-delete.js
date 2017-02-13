const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server')

    // delete many
    db.collection('Todos').deleteMany({
        text: 'something to do hehe'
    }).then((result) => {
        console.log(result);
    })

    // delete one
    db.collection('Todos').deleteOne({
        text: 'something to do hehe'
    }).then((result) => {
        console.log(result);
    })

    // find one and delete
    db.collection('Todos').findOneAndDelete({
        completed: false
    }).then((result) => {
        //result here returns object that was deleted
        console.log(result);
    });

    db.close();
});
