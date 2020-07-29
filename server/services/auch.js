const argon2 = require('argon2');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');

 class AuthService {
  async SignUp(login, password) {
    const salt = crypto.randomBytes(32);
    const passwordHashed = await argon2.hash(password, { salt });

    // userRecord = await UserModel.create({
    //     password: passwordHashed,
    //     email,
    //     salt: salt.toString('hex'),
    //     name,
    //   });

    const token = this.generateJWt(login);
    return {
      user: { login },
      token,
    };
  }

  generateJWt(login) {
    return jwt.sign(
      {
        data: {
          login: login,
        },
      },
      'MySuP3R_z3kr3t.'
    ); // @TODO move this to an env var
  }
}

module.exports = AuthService;
