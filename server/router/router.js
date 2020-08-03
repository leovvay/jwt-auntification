const express = require('express');
const signup = require('./signup');
const login = require('./login');
const activeUser = require('./activeUser')

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/activeUser', activeUser) 

module.exports = router;
