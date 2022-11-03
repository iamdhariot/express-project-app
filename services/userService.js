const db = require("configs/db");
const { func } = require("joi");

module.exports = {
  create,
};
async function create(params) {
  //validate

  if (await db.User.findOne({ where: { email: params.email } })) {
    throw `Email ${params.email} + is already taken`;
  }
  //hash password

  await db.User.create(params);
}
