const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

// Api
const cors = require("cors");
const configCors = require("./configs/cors.js");

// Route configs
const connection = require("./configs/connection.js");
const routes = require("./routes/index.js");

const PORT = 8000 || process.env.PORT;

const app = express();

// Config Cors -- option
// const corsOption = {
//   origin: [`http://localhost:${process.env.PORT}`],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
// };

app.use(cors());
configCors(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Connect to Mongoose DB
connection();
routes(app);
