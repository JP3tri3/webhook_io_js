const express = require('express');
const router = express.Router();

const { signup } = require('../controllers/auth');

router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' })
});

router.post('/signup', signup);

module.exports = router;
