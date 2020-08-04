const express = require('express');
const signup = require('./signup');
const login = require('./login');
const activeUser = require('./activeUser');
const isAuch = require('../middlewares/isAuth');
const attachCurrentUser = require('../middlewares/attachCurrentUser')

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/activeUser',isAuch, attachCurrentUser, activeUser) 

module.exports = router;
