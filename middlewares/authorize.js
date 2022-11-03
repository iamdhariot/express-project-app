const jwt = require("jsonwebtoken");
if (process.env.PORT !== "production") {
  require("dotenv").config();
}
const JWT_KEY = process.env.JWT_SECRET;
const authorize = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(400).send("Access denied");
  try {
    const verifiedUser = jwt.verify(token, JWT_KEY);
    req.user = verifiedUser;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
};
module.exports = { authorize };
// const jwt = require("jsonwebtoken");
// if (process.env.PORT !== "production") {
//   require("dotenv").config();
// }
// const JWT_KEY = process.env.JWT_SECRET;
// const db = require("configs/db");

// module.exports = authorize;

// function authorize() {
//   return [
//     // authenticate JWT token and attach decoded token to request as req.user
//     jwt({ JWT_KEY, algorithms: ["HS256"] }),

//     // attach full user record to request object
//     async (req, res, next) => {
//       // get user with id from token 'sub' (subject) property
//       const user = await db.User.findByPk(req.user.sub);

//       // check user still exists
//       if (!user) return res.status(401).json({ message: "Unauthorized" });

//       // authorization successful
//       req.user = user.get();
//       userIp = req.ip;
//       console.log(userIp);
//       next();
//     },
//   ];
// }
