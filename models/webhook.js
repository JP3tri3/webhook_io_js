const { json } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const webhookSchema = new Schema({
    symbol: {
        type: String,
        required: true
    },
    trigger: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Webhook = mongoose.model('Webhook', webhookSchema);
module.exports = Webhook;