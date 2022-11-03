exports.createCustomer = async (req, res, next) => {
  return res.status(200).send({ message: "hitting the customer create route" });
};

exports.customers = async (req, res, next) => {
  return res.status(200).send({ message: "hitting the customers router" });
};
exports.customerData = async (req, res, next) => {
  return res.status(200).send({ message: "hitting the customer data route" });
};
