const mongoose = require('../database');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    publishDate: {
        type: Date,
        require: true,
    },
    author: {
        type: String,
        require: true,
    },
    cover: {
        type: String,
        require: false,
    },
    subject: {
        type: String,
        require: false,
    }
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;