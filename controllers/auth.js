const User = require('../models/user');
const confirmPassword = require('../services/confirmPassword');
const emailFormat = require('../services/confirmEmailFormat');
const mail = require('./mail');

// mail.generateVerificationEmail('test1234');

exports.signup = (req, res) => {
    console.log(req.body);
    let { email, password, confirmPassword } = req.body;
    User.findOne({ email }).exec((err, user) => {
        if (user) {
            console.log("Error: User with this email already exists.");
            res.render('signup', {
                title: "Sign Up",
                errorMessage: "Email address already exists."
            });

        } else if (!emailFormat(email)) {
            res.render('signup', {
                title: "Sign Up",
                errorMessage: "Email address is not a valid format"
            });

        } else if (password != confirmPassword) {

            res.render('signup', {
                title: "Sign Up",
                errorMessage: "Passwords do not match!"
            });
        } else {

            let newUser = new User({ email, password });

            newUser.save()
                .then((result) => {
                    console.log("Signup Success!")
                    res.render('signin', {
                        title: 'Sign in',
                        successMessage: "User account successfully created!"
                    });
                })
                .catch((err) => {
                    console.log("Error in signup: ", err);
                    res.render('signup', {
                        title: "Sign Up",
                        errorMessage: err
                    });
                });
        }
    });
}

exports.signin = (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        User.findOne({ email }).exec((err, user) => {
            if (user) {
                let checkPassword = confirmPassword(password, user.password);

                checkPassword ?
                    res.render('signin', {
                        title: 'Sign in',
                        successMessage: "Successful Signin"
                    })
                    : res.render('signin', {
                        title: 'Sign in',
                        errorMessage: "Incorrect Password"
                    })
            } else {
                res.render('signin', {
                    title: 'Sign in',
                    errorMessage: "Invalid Email Address"
                })
            }

        })
    } catch (err) {
        console.log(err)
    }
}