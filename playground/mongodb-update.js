const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server')

    //Find one and update
    db.collection('Todos').findOneAndUpdate({
        text: 'something to do hehe'
    }, {
        //We need operators to manipulate
        $set: {
            completed: true
        }
    }, {
        //Options on what to return after editing
        returnOriginal: false
    }).then((err, result) => {
        if (err) {
            return console.log(err);
        }
        console.log(result);
    })

    db.collection('Users').findOneAndUpdate({
        name: 'Scott'
    }, {
        $set: {
            name: 'Cho'
        },
        //increment by 1
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((err, result) => {
        if (err) {
            return console.log(err);
        }
        console.log(result);
    })

    db.close();
});
