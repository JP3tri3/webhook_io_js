const mongoose = require('mongoose');
const User = require('../models/user');

const confirmUserAccount = (args, res) => {

    const user = new User({
        email: args.email,
        password: args.password,
        confirmPassword: args.confirmPassword
    })

    console.log(user)

    user.save()
        .then((result) => {
            res.redirect('/feedback')
        })
        .catch((err) => {
            console.log(err)
        });
}
