const express = require('express');
const cors = require('cors');

const fs = require('fs');
const _ = require('lodash');
const morgan = require('morgan');

const handleFeedback = require('./controllers/handleFeedback')

const app = express();

const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');

require('dotenv').config()
require('./db/connectDB')

const AUTH_TOKEN = process.env.AUTH_TOKEN;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/auth', authRoutes);

// app.use((req, res, next) => {
//     console.log('new request made: ');
//     console.log('host ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// });

app.post("/webhook", (req, res) => {
    handle_webhook(req, res);
});

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
    const testInput = [
        { title: "title 1", snippet: 'content 1' },
        { title: "title 2", snippet: 'content 2' },
    ];

    res.render('about', { title: 'About', testInput });
});

// app.get('/sign-up', (req, res) => {
//     res.render('sign-up', { title: 'Sign Up' })
// });

// app.post('/sign-up', (req, res) => {
//     createUser(req.body, res)
// })

// app.get('/signin', (req, res) => {
//     res.render('signin', { title: 'Sign In' })
// });

app.get('/feedback', (req, res) => {
    res.render('feedback', { title: 'Feedback' })
});

app.post('/feedback', (req, res) => {
    console.log(req.body)
    handleFeedback(req.body, res)
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
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
        });

    } else {
        console.log("Unauthorized passphrase", incomingData)
        return res.status(403).send({
            "code": "error",
            "message": "Invalid Passphrase"
        });


    };
};