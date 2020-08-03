const AuthService = require('../services/auch.js');

async function login(req, res, next) {
  try {
    const { login, password } = req.body;
    const authService = new AuthService();
   
    const { user, token } = await authService.LogIn(login, password);
    return res.send({ user, token });
  } catch (e) {
    return res.sendStatus(401);
  }
}

module.exports = login;
