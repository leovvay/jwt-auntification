const AuthService = require('../services/auch');

async function signup(req, res, next) {
  try {
    const authService = new AuthService();
    const { user, token } = await authService.SignUp(req.body);
    return res.send({ user, token });
  } catch (e) {
    return res.json(e).status(500).end();
  }
}

module.exports = signup;
