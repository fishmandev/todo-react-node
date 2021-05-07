const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../model/user');
const refreshTokenModel = require('../model/refreshToken');

module.exports = {
  getAccessToken: (req, res, next) => {
    const username = req.body.username || '';
    const password = req.body.password || '';
    user.getUserByUsername(username).then(user => {
      if (!user || !bcrypt.compareSync(password, user.password))
        return res.status(401).json({ erorr: 'Invalid username or password' });

      let accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN_KEY, {
        expiresIn: 86400, // expires in 24 hours
        algorithm: 'HS512'
      });
      let currentTimeStamp = + new Date();
      refreshTokenModel.create(user.id, currentTimeStamp).then(id => {
        let refreshToken = jwt.sign({
          id: user.id,
          rid: id, // row id (PK)
          ts: currentTimeStamp
        }, process.env.JWT_REFRESH_TOKEN_KEY, {
          expiresIn: 86400, // expires in 24 hours
          algorithm: 'HS512'
        });
        res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
      }).catch(next);
    }).catch(next);
  },
  getToken: (req, res, next) => {
    const refreshToken = req.body.refreshToken || '';
    let refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_KEY;
    jwt.verify(refreshToken, refreshTokenSecret, { algorithms: ['HS512'] }, (err, decoded) => {
      if (err)
        return res.status(401).json({ error: 'Unauthorized' })
      refreshTokenModel.delete(decoded.rid).then(count => {
        if (count == 0)
          return res.status(401).json({ error: 'Unauthorized' })
        let accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_ACCESS_TOKEN_KEY, {
          expiresIn: 86400, // expires in 24 hours
          algorithm: 'HS512'
        });
        let currentTimeStamp = + new Date();
        refreshTokenModel.create(decoded.id, currentTimeStamp).then(id => {
          let refreshToken = jwt.sign({
            id: user.id,
            rid: id, // row id (PK)
            ts: currentTimeStamp
          }, process.env.JWT_REFRESH_TOKEN_KEY, {
            expiresIn: 86400, // expires in 24 hours
            algorithm: 'HS512'
          });
          res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
        }).catch(next);
      }).catch(next);
    });
  }
};