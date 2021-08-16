const User = require('../models/user');

exports.signup = (req, res) => {
    console.log(req.body);
    const { email, password, confirmPassword } = req.body;
    User.findOne({ email }).exec((err, user) => {
        if (user) {
            console.log("Error: User with this email already exists.");
            res.render('signup', {
                title: "Sign Up",
                errorMessage: "Email address already exists."
            });
        } else if (password != confirmPassword) {
            console.log("Passwords do not match.");
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
                    })
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
    console.log("Successfully signed in")
}