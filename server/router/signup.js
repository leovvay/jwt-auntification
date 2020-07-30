const AuthService = require('../services/auch.js');



async function signup(req, res, next) {
  try {
    const { login, password } = req.body;
    const authService = new AuthService();
    const { user, token } = await authService.SignUp(login, password);
    return res.send({ user, token });
  } catch (e) {
    return res.json(e).status(500).end();
  }
}

module.exports = signup;
