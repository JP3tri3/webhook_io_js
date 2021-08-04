const express = require('express');
const mongoose = require('mongoose');
const dbLogic = require('./controller/db-logic.js');
const fs = require('fs');
const _ = require('lodash');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');

require('dotenv').config()

const PORT = process.env.PORT;
const AUTH_TOKEN = process.env.AUTH_TOKEN;

const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nxe5s.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to database'))
    .then((result) =>
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        }))
    .catch((err) => console.log(err));


app.post("/webhook", (req, res) => {
    handle_webhook(req, res);
})

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
})

app.get('/about', (req, res) => {
    const testInput = [
        { title: "title 1", snippet: 'content 1' },
        { title: "title 2", snippet: 'content 2' },
    ];

    res.render('about', { title: 'About', testInput });
})

app.get('/users/new', (req, res) => {
    res.render('create', { title: 'New User' })
})

app.use((req, res) => {
    res.status(404).res.render('404', { title: '404' });
})



const handle_webhook = (req, res) => {
    let incomingData = req.body
    let passphrase = incomingData.passphrase
    if (passphrase == AUTH_TOKEN) {
        console.log("message received")
        console.log(incomingData)
        return res.status(200).send({
            "code": "success",
            "message": "payload processed"
        })

    } else {
        console.log("Unauthorized passphrase", incomingData)
        return res.status(403).send({
            "code": "error",
            "message": "Invalid Passphrase"
        })


    }
}