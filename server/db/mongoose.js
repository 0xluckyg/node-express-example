const mongoose = require('mongoose');

//Tells mongoose we're using the built in promise
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
