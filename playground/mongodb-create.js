const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server')

    // Putting in data
    db.collection('Todos').insertOne({
        text: 'something to do hehe',
        completed: false
    }, (err, result)=>{
        if (err) {
            return console.log('unable to insert todo');
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    })

    // Putting in data to a different collection
    db.collection('Users').insertOne({
        name: 'Scott',
        age: 20,
        location: 'New York'
    }, (err, result) => {
        if (err) {
            return console.log('unable to insert user');
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
        //_id stores time, pid, machine id
        console.log(result.ops[0]._id.getTimestamp());
    })

    db.close();
});
