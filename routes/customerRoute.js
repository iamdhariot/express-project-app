const router = require("express").Router();
const customerController = require("../controllers/customerController");
const { userRegisterValidation } = require("../middlewares/validation");

router.post("/", customerController.createCustomer, userRegisterValidation);
router.get("/", customerController.customers);
router.get("/:id", customerController.customerData);

module.exports = router;
