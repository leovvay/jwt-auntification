const argon2 = require('argon2');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');

const mailer = require('../services/mailer');
const config = require('../config');
const db = require('../db');

class AuthService {
  async LogIn(login, password) {
    const options = {
      text: 'SELECT * FROM users WHERE login = $1',
      values: [login],
    };
    const { rows: [userRecord] } = await db.query(options.text, options.values);
    
    if (!userRecord) {
      throw new Error('User not found');
    } else {
      const correctPassword = await argon2.verify(userRecord.password, password);
      if (!correctPassword) {
        throw new Error('Incorrect password');
      }
    }
    const token = this.generateJWt(userRecord);

    return {
      user: { login, email: userRecord.email },
      token,
    };
  }

  async addUserToDB({ login, email }, salt, password) {
    const options = {
      text: 'INSERT INTO users(login, email, salt, password) VALUES($1, $2, $3, $4) RETURNING *',
      values: [login, email, salt, password],
    };
    this.query(options);
  }

  async activateUser({user: {login} }) {
    const options = {
      text: 'UPDATE users SET isactive = true WHERE login = $1',
      values: [login],
    };
    this.query(options);
  }

  async SignUp({ login, email, password }) {
    const user = { login, email };
    const salt = crypto.randomBytes(32);
    const passwordHashed = await argon2.hash(password, { salt });


    const stringSalt = salt.toString('hex');
    this.addUserToDB(user, stringSalt, passwordHashed);
    
    const token = this.generateJWt(login);

    const link = `<a href="${config.domen}/registration-success?token=${token}">Click here for verify your account</a>`;
    const message = `<p>your login: ${login}<br>you password: ${password}<br>${link}</p>`
    mailer({
      from: config.mailUser,
      to: email,
      subject: 'Verify your account',
      text: 'Click here for verify your account',
      html: message,
    });

    return {
      user,
      token,
    };
  }

  generateJWt(user) {
    const { login, email } = user;
    return jwt.sign({ data: { login, email } }, config.secretKey);
  }
  async query(options) {
    try {
      const answer = await db.query(options);
    } catch (err) {
      console.log(err.stack);
    }
  }
}

module.exports = AuthService;
