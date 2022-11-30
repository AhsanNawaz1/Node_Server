require("dotenv").config();
// const bodyParser = require("body-parser");
const express = require("express");
const userRoute = require("./routes/user");
const DB = require("./Database/config");
const allRoutes = require("./routes/index");
const CRUDSchema = require("./routes/CRUD");
const route = require("./routes/index");
const { fileParser } = require('express-multipart-file-parser')


const database = async () => {
  await DB();
}

database();

const app = express();
var cors = require('cors');
app.use(cors())
const { API_PORT } = process.env;
const PORT = 1337;

app.use(express.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(fileParser({
  rawBodyOptions: {
    limit: '15mb',
  },
}))
app.use(route);
app.listen(process.env.PORT || 1337);

