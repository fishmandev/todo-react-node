const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../model/user');

module.exports = {
  getAccessToken: (req, res, next) => {
    const username = req.body.username || '';
    const password = req.body.password || '';
    user.getUserByUsername(username).then(user => {
      if (!user || !bcrypt.compareSync(password, user.password))
        return res.status(401).json({ erorr: 'Invalid username or password' });

      let token = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN_KEY, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).json({ accessToken: token });
    }).catch(next);
  }
};