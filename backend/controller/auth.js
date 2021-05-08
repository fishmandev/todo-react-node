const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');
const refreshTokenModel = require('../model/refreshToken');

class UnauthorizedException extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedException';
  }
}

const generateRefreshToken = async (userId) => {
  let timestamp = + new Date();
  let id = await refreshTokenModel.create(userId, timestamp);
  let refreshToken = jwt.sign({ id: userId, rid: id, ts: timestamp }, process.env.JWT_REFRESH_TOKEN_KEY, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    algorithm: 'HS512'
  });
  return refreshToken;
}

const getUpdatedTokens = async (userId, refreshTokenId) => {
  let isDeleted = await refreshTokenModel.delete(refreshTokenId);
  if (!isDeleted)
    throw new UnauthorizedException('Unauthorized');
  let accessToken = jwt.sign({ id: userId }, process.env.JWT_ACCESS_TOKEN_KEY, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    algorithm: 'HS512'
  });
  let refreshToken = await generateRefreshToken(userId);
  return { accessToken, refreshToken };
}

module.exports = {
  getAccessToken: async (req, res, next) => {
    const username = req.body.username || '';
    const password = req.body.password || '';
    try {
      let user = await userModel.getUserByUsername(username);
      if (!user || !bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException('Invalid username or password');
      let accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN_KEY, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
        algorithm: 'HS512'
      });
      let refreshToken = await generateRefreshToken(user.id);
      res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
      if (err instanceof UnauthorizedException)
        return res.status(401).json({ error: err.message });
      next(err);
    }
  },
  getToken: async (req, res, next) => {
    const refreshToken = req.body.refreshToken || '';
    let refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_KEY;
    try {
      let { id, rid } = jwt.verify(refreshToken, refreshTokenSecret, { algorithms: ['HS512'] });
      let tokens = await getUpdatedTokens(id, rid);
      res.status(200).json(tokens);
    } catch (err) {
      if (err instanceof UnauthorizedException || err instanceof jwt.JsonWebTokenError)
        return res.status(401).json({ error: 'Unauthorized' });
      next(err);
    }
  }
};