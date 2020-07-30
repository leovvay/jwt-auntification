const argon2 = require('argon2');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const db = require('../db');

class AuthService {
  async LogIn(login, password) {
    const {
      rows: [userRecord],
    } = await db.query(`SELECT * FROM users WHERE login = $1`, [login]);
    if (!userRecord) {
      throw new Error('User not found');
    } else {
      const correctPassword = await argon2.verify(userRecord.password, password);
      if (!correctPassword) {
        throw new Error('Incorrect password');
      }
    }
    console.log('login: ', login);
    const token = this.generateJWt(login);
    
    console.log('token: ', token);
    return {
      user: { login, fromBD: true },
      token,
    };
  }

  async SignUp(login, password) {
    const salt = crypto.randomBytes(32);
    const passwordHashed = await argon2.hash(password, { salt });

    // userRecord = await db.query()
    // salt: salt.toString('hex'), passwordHashed

    const token = this.generateJWt(login);
    return {
      user: { login },
      token,
    };
  }

  generateJWt(login) {
    return jwt.sign(
      {
        data: { login },
      },
      'MySuP3R_z3kr3t.'
    ); // @TODO move this to an env var
  }
}

module.exports = AuthService;
