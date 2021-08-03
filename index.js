const express = require('express');
const mongoose = require('mongoose');
const Webhook = require('./models/webhook');
const User = require('./models/user');

const app = express()
app.use(express.json())
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

app.get('/test_webhook', (req, res) => {
    const webhook = new Webhook({
        symbol: 'ETH',
        trigger: 'test trigger'
    })

    webhook.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
});


app.post("/webhook", (req, res) => {
    handle_webhook(req, res)
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