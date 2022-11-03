const fs = require("fs");
const http = require("http");
const https = require("https");
const app = require("./app");
//for https
const key = fs.readFileSync(
  "./encryptions/cert/CA/localhost/localhost.decrypted.key"
);
const cert = fs.readFileSync("./encryptions/cert/CA/localhost/localhost.crt");

const server = http.createServer(app);
//const server = https.createServer({ key, cert }, app);

if (process.env.PORT !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
