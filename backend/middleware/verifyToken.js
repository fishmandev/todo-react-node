const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.headers['x-access-token'];
  let tokenSecret = process.env.JWT_ACCESS_TOKEN_KEY;
  if (!token)
    return res.status(403).json({ error: 'Forbidden' });
  jwt.verify(token, tokenSecret, (err, decoded) => {
    if (err)
      return res.status(401).json({ error: 'Unauthorized' })
    req.userId = decoded.id;
    next();
  });
}