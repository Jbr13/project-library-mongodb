const express = require('express')
const Book = require('../models/Book');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.post('/',
    body('title').isString(),
    body('author').isString(),
    body('cover').isString(),
    body('subject').isString(),
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            console.log(req.body)

            const dia = req.body.publishDate.split('/')[0];
            const mes = req.body.publishDate.split('/')[1];
            const ano = req.body.publishDate.split('/')[2];

            console.log(new Date(`${mes}/${dia}/${ano}`))

            const book = await Book.create({...req.body, publishDate: new Date(`${mes}/${dia}/${ano}`)});

            return res.send({ book })
        } catch (e) {
            return res.status(400).send({ error: `Unable to create a new book ${e.message}`})
        }
});

router.get('/', async (req, res) => {
    return res.send(await Book.find().then(it => {
            return it.map(it => { return {
                _id: it.id,
                title: it.title,
                publishDate: it.publishDate.toLocaleDateString("pt-BR"),
                author: it.author,
                cover: it.cover,
                subject: it.subject
            }
        })
    }));
});

router.get('/:id', async (req, res) => {
    const {
        title,
        publishDate,
        author,
        cover,
        subject
    } = await Book.findById(req.params.id)

    const book = {
        title,
        publishDate,
        author,
        cover,
        subject
    }

    if (!book) {
        return res.send({ message: `book with id ${req.params.id} was not found` })
    }

    return res.send({
        ...book,
        publishDate: book.publishDate.toLocaleDateString("pt-BR")
    });
});

router.put('/:id', async (req, res) => {

    req.body.publishDate = `${req.body.publishDate.split("/")[1]}/${req.body.publishDate.split("/")[0]}/${req.body.publishDate.split("/")[2]}`

    console.log(req.body)

    Book.findByIdAndUpdate(req.params.id, req.body, async (err, doc) => {
        if (err) return res.send({ error: err });
        return res.send({
            message: 'Success',
            object: await Book.findById(req.params.id)
        });
    })
});

router.delete('/:id', async (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, doc) => {
        if (err) return res.send({ error: err });
        return res.send({ message: `Book with i ${req.params.id} was deleted with success` });
    })
});

module.exports = (app) => app.use('/book', router);
