const express = require("express");
const hbs = require("hbs");
const path = require("path");
const { syncDataBase } = require("./Controllers/dataBase");
const { dataBaseRouter } = require("./Routers/dataBaseRouter");
const { homeRouter } = require("./Routers/homeRouter");

const app = express();

const PORT = 3000;

app.use("/bootstrap", express.static(path.join(__dirname, "./node_modules/bootstrap")));
// app.use("/js", express.static(path.join(__dirname, "../Client/www")));
app.use("/jquery", express.static(path.join(__dirname, "./node_modules/jquery")));

app.use(express.json());
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname + '/views/partials'))
//API
app.use('/database', dataBaseRouter)
app.use('/', homeRouter)



app.use(function (req, res) {
  res.status(404).render("404.hbs");
});

app.listen(PORT, () => console.log(`My port is ${PORT}`));
syncDataBase()
module.exports = {
  app,
  PORT,
};
