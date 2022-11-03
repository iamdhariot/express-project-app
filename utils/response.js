exports.messageResponse = async (status, message, res) => {
  return res.status(status).send({ message: message });
};
exports.dataResponse = async (status, data, res) => {
  return res.status(status).send(data);
};
