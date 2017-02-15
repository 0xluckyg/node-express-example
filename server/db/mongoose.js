const mongoose = require('mongoose');

//Tells mongoose we're using the built in promise
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};
