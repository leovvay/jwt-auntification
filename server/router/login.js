const AuthService = require('../services/auch.js');



async function login(req, res, next) {
  try {
    const { login, password } = req.body;
    const authService = new AuthService();
   
    const { user, token } = await authService.LogIn(login, password);
    console.log('login')
    return res.send({ user, token });
  } catch (e) {
    return res.json(e).status(401).end();
  }
}

module.exports = login;
