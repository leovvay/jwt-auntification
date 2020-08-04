const auchServices = require('../services/auch');
const {INTERNAL_SERVER_ERROR, UNAUTHORIZED} = require('../constants')


module.exports = async (req, res, next) => {
  try {
    const decodedUser = req.token.data;
    const auch = new auchServices();
    const user = await auch.findUser(decodedUser.login);
    if (!user || !user.login) {
      res.sendStatus(UNAUTHORIZED);
    }
    req.currentUser = user;
    return next();
  } catch(e) {
    return res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}