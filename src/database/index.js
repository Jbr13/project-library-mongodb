let { connect, Promise, Schema, model } = require('mongoose');

const mongoose = {
    Promise,
    connect,
    Schema,
    model
}

mongoose.connect('mongodb://root:Toor123.@localhost:27017');
mongoose.Promise = global.Promise;

module.exports = mongoose;