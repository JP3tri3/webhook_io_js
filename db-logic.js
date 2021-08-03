const mongoose = require('mongoose')
const Webhook = require('./models/webhook');
const User = require('./models/user');

const storeWebhook = (app) => {
    app.get('/test-webhook', (req, res) => {
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
}

const getAllWebhooks = () => {
    Webhook.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err)
        });
};

const getAllWebhooksRoute = (app) => {
    app.get('/all-webhooks', (req, res) => {
        Webhook.find()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                console.log(err)
            });
    });
}

const getWebhookByID = (app, id) => {
    app.get('/single-webhook', (req, res) => {
        Webhook.findById(id)
            .then((result) => {
                res.send(result)
                console.log(result)
            })
            .catch((err) => {
                console.log(err)
            });
    });
}



module.exports = { storeWebhook, getAllWebhooks, getAllWebhooksRoute, getWebhookByID }