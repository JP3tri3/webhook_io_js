const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        max: 32
    },
    resetLink: {
        data: String,
        default: ''
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;