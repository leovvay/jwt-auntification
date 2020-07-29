export default function signup(req, res, next) {
  res.status(200);
  res.send('signup working');
  const user = req.body;
  res.body = user;
  res.end();
}
