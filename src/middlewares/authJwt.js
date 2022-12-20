const db = require('../models');
const { SECRETKEY } = require('../config.js')
const jwt = require('jsonwebtoken');


 const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRETKEY);
    req.userId = decoded.id;

    const user = await db.users.findOne({ where: { userId:  req.userId, isActive: true}});
    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};
module.exports={
    verifyToken
}