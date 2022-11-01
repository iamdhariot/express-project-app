require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");

if (process.env.PORT !== "production") {
  require("dotenv").config();
}
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
