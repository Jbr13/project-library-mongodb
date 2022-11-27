const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

require('./controllers/BookController')(app);

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000/")
})