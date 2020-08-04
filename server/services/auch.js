const argon2 = require('argon2');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');

const mailer = require('../services/mailer');
const config = require('../config');
const db = require('../db');

class AuthService {
  async LogIn(login, password) {
    const userRecord = await this.findUser(login);

    if (!userRecord) {
      throw new Error('User not found');
    } else if (!userRecord.isactive) {
      throw new Error('User not active');
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

  async findUser(login) {
    const options = {
      text: 'SELECT * FROM users WHERE login = $1',
      values: [login],
    };
    const {
      rows: [userRecord],
    } = await db.query(options.text, options.values);
    return userRecord;
  }

  async addUserToDB({ login, email }, salt, password) {
    const options = {
      text: 'INSERT INTO users(login, email, salt, password) VALUES($1, $2, $3, $4) RETURNING *',
      values: [login, email, salt, password],
    };
    this.query(options);
  }

  async activateUser({ login }) {
    const options = {
      text: 'UPDATE users SET isactive = true WHERE login = $1',
      values: [login],
    };
    this.query(options);
  }

  async SignUp({ login, email, password }) {
    const loginAlreadyExists = await this.findUser(login);
    if (loginAlreadyExists) {
      throw new Error(`user with login: ${login} already exists`);
    }
    const user = { login, email };
    const salt = crypto.randomBytes(32);
    const passwordHashed = await argon2.hash(password, { salt });

    const stringSalt = salt.toString('hex');
    this.addUserToDB(user, stringSalt, passwordHashed);

    const token = this.generateJWt(user);

    const link = `<a href="${config.domen}/registration-success?token=${token}">Click here for verify your account</a>`;
    const message = `<p>your login: ${login}<br>you password: ${password}<br>${link}</p>`;
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
    const data = { login, email };
    return jwt.sign({ data }, config.secretKey, { expiresIn: '6h', algorithm: 'HS256' });
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
