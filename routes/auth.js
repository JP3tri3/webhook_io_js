const express = require('express');
const router = express.Router();

const { signup, signin } = require('../controllers/auth');

router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' })
});

router.post('/signup', signup);

router.get('/signin', (req, res) => {
    res.render('signin', { title: 'Sign In' })
});

router.post('/signin', signin);

module.exports = router;
