const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/", userController.signUp);
router.post("/login", userController.logIn);
router.get("/", userController.getAllUsers);
router.delete("/:id", userController.deleteUser);
router.patch("/:id", userController.updateUser);
router.get("/data", userController.data);

module.exports = router;
