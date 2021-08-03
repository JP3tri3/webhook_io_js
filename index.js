const express = require('express');

const app = express()
app.use(express.json())


require('dotenv').config()

const PORT = process.env.PORT
const AUTH_TOKEN = process.env.AUTH_TOKEN



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

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