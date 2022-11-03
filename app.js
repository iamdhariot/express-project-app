require("rootpath")();

const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors"); //for cors error
const bodyParser = require("body-parser");

global.__basedir = __dirname;
// require("configs/db");
const userRoute = require("./routes/userRoute");
const customerRoute = require("./routes/customerRoute");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//dashboard
app.use(express.static(path.join(__dirname, "dist")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html")); // ./dist/index.html
});

app.use("/user", userRoute);
app.use("/customer", customerRoute);
module.exports = app;
