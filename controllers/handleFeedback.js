const Feedback = require('../models/feedback');

module.exports = function (args, res) {

    const feedback = new Feedback({
        email: args.email,
        subject: args.subject,
        body: args.body
    })

    feedback.save()
        .then((result) => {
            res.redirect('/feedback')
        })
        .catch((err) => {
            console.log(err)
        });
};