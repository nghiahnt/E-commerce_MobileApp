const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const jwt = require("jsonwebtoken");

const connection = require("./configs/connection.js")
const routes = require("./routes/index.js")

const port = 8000 || process.env.PORT;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

console.log(process.env.ACCOUNT_GOOGLE, process.env.PASSWORD);

// Connect to Mongoose DB
connection();
routes(app);
