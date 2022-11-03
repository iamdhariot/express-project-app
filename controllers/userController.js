const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  userRegisterValidation,
  userLoginValidation,
} = require("../middlewares/validation");
const db = require("configs/db");
if (process.env.PORT !== "production") {
  require("dotenv").config();
}
const JWT_KEY = process.env.JWT_SECRET;

exports.signUp = async (req, res, next) => {
  const { error, value } = userRegisterValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const emailExist = await db.User.findOne({
    where: { email: req.body.email },
  });

  if (emailExist)
    return res.status(400).send({ message: "Email already exists!" });
  try {
    const newUser = await createUserObject(req.body);
    const savedUser = await db.User.create(newUser);
    return res.status(200).send({ message: "User created successfully!" });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Failed to create new user", error });
  }
};

exports.logIn = async (req, res, next) => {
  const { error, value } = userLoginValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  //check user found or not
  const foundUser = await db.User.findOne({ where: { email: req.body.email } });
  if (!foundUser)
    return res.status(400).send({ message: "invalid login credential" });
  try {
    const isMatch = bcrypt.compareSync(req.body.password, foundUser.password);

    if (!isMatch)
      return res.status(400).send({ message: "invalid login credential" });

    const token = jwt.sign({ sub: foundUser.id }, JWT_KEY, { expiresIn: "7d" });
    console.log(token);
    const loginUserObj = await loggedInUserObj(
      foundUser.name,
      foundUser.email,
      token
    );
    return res.status(200).send(loginUserObj);
  } catch (error) {
    return res.status(400).send({ message: "Failed to login" }, error);
  }
};

exports.getAllUsers = async (req, res) => {
  const allUsers = await db.User.findAll();
  if (!allUsers || allUsers.length === 0) {
    res.status(400).send({ message: "no users found" });
  } else {
    return res.status(200).send(allUsers);
  }
};

exports.deleteUser = async (req, res) => {
  const user = await db.User.findByPk(req.params.id);
  if (!user) {
    return res.status(400).send({ message: "User not found!" });
  }
  try {
    const deletedUser = await user.destroy();
    return res.status(200).send({ message: "User deleted successfully!" });
  } catch (error) {
    return res.status(400).send({ message: "Failed to delete user!" });
  }
};

exports.updateUser = async (req, res) => {
  const user = await db.User.findByPk(req.params.id);
  if (!user) return res.status(400).send({ message: "User not found!" });
  const { error, value } = userRegisterValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  //check if email address exists or not
  const emailUpdated = req.body.email && user.email !== req.body.email;
  if (
    emailUpdated &&
    (await db.User.findOne({ where: { email: req.body.email } }))
  )
    return res.status(400).send({ message: "Email already exists!" });
  try {
    const updateUserObj = await createUserObject(req.body);
    await user.update(updateUserObj, { where: req.params.id });
    return res.status(200).send({ message: "User updated successfully!" });
  } catch (error) {
    return res.status(400).send({ message: "Failed to update user!" });
  }
};

exports.data = async (req, res, next) => {
  return res.status(200).send({ message: "hitting the data route" });
};
// db operation async functions
async function getUser(id) {
  const user = await db.User.findByPk(id);
  if (!user) throw "User not found";
  return user;
}

//request apis object
const createUserObject = async ({ name, email, password }) => {
  return {
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10),
  };
};

const loggedInUserObj = async (name, email, token) => {
  return { name: name, email: email, token: token };
};
