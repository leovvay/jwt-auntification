const AuthService = require('../services/auch');

const { UNAUTHORIZED} = require('../constants');


async function signup(req, res, next) {
  try {
    const authService = new AuthService();
    const { user, token } = await authService.SignUp(req.body);
    return res.send({ user, token });
  } catch (e) {
    console.log('e: ', e);
    return res.sendStatus(UNAUTHORIZED);
  }
}

module.exports = signup;
