const joi = require("joi");
// const validateRequest = require("./validateRequest");
function userRegisterValidation(data) {
  const schema = joi.object({
    name: joi.string().min(4).required(),
    email: joi.string().min(6).email().required(),
    password: joi.string().min(4).required(),
  });
  //validateRequest(req, next, schema);

  return schema.validate(data);
}

function userLoginValidation(data) {
  const schema = joi.object({
    email: joi.string().min(4).required(),
    password: joi.string().min(4).required(),
  });
  return schema.validate(data);
}

module.exports = { userRegisterValidation, userLoginValidation };
