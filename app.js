require("dotenv").config();
require("./src/services/mongoDB/mongoose")
const express=require("express");
const bodyParser=require("body-parser");
const indexRouters=require("./src/routes/index.routes")

const PORT=process.env.PORT || 3000;

const app = express();

// settings
app.set("PORT", PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/",indexRouters)


module.exports= app;