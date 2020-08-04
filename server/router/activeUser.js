const AuthService = require('../services/auch.js');

const {INTERNAL_SERVER_ERROR} = require('../constants')

async function activeUser(req, res) {
  try {
    const authService = new AuthService();
    await authService.activateUser(req.currentUser);
    return res.send('now you active');
  } catch (e) {
    return res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

module.exports = activeUser;