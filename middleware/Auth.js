const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log("token", token)
    console.log("secret",process.env.JWT_SECRET )
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
      throw new Error('Admin not found.');
    }


    const tokenExists = admin.tokens.some((t) => t.token === token);
    if (!tokenExists) {
      throw new Error('Token not matching.');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error(error.message)
    res.status(401).send({ error: 'Please authenticate as user.' });
  }
};

module.exports = userAuth;
