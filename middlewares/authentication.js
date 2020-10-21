const jwt = require('jsonwebtoken');
const { User } = require('../models/index.js');

async function userAuthentication(req, res, next) {
  try {
    if (!req.headers.access_token) {
      res.status(401).json({ message: "Unauthorized." });
    } else {
      req.payload = jwt.verify(req.headers.access_token, process.env.JWT_SECRET_KEY);
      const userdata = await User.findOne({ where: { id: req.payload.id } });
      if (userdata !== null) {
        next();
      } else {
        res.status(401).json({ message: "Unauthorized." });
      }
    }
  } catch (err) {
    res.status(401).json({ message: "Unauthorized." });
  }
}

module.exports = userAuthentication;