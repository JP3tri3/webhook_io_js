const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = function (args, res) {

    if (args.password !== args.confirmPassword) {
        

    } else {
        console.log('nope')
    }

    const user = new User({
        email: args.email,
        password: args.password,
        confirmPassword: args.confirmPassword
    })

    console.log(user)

    user.save()
        .then((result) => {
            res.redirect('/sign-in')
        })
        .catch((err) => {
            console.log(err)
        });
}
