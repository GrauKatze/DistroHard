const express = require("express");
const hbs = require("hbs");
const bcrypt = require("bcrypt");
const path = require("path");
const { syncDataBase, selectDataOne, insertData, User, updateData } = require("./Controllers/dataBase");
const { createRouter } = require("./Routers/createDBRoute");
const { dataBaseRouter } = require("./Routers/dataBaseRouter");
const { deleteBaseRouter } = require("./Routers/deleteDBRouter");
const { editRouter } = require("./Routers/editDBRouter");
const { homeRouter } = require("./Routers/homeRouter");
const { randomUUID } = require("crypto");
const { registration } = require("./Controllers/auth");

const app = express();
const PORT = 3000;

app.use(
    "/bootstrap",
    express.static(path.join(__dirname, "./node_modules/bootstrap"))
);
// app.use("/js", express.static(path.join(__dirname, "../Client/www")));
app.use(
    "/jquery",
    express.static(path.join(__dirname, "./node_modules/jquery"))
);

app.use(express.json());
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname + "/views/partials"));

//API
app.use("/", homeRouter);
app.use("/database", dataBaseRouter);
app.use("/database/edit", editRouter);
app.use("/database/create", createRouter);
app.use("/database/delete", deleteBaseRouter);
app.use(function (req, res) {
    res.status(404).render("404.hbs");
});

app.listen(PORT, () => console.log(`My port is ${PORT}`));
syncDataBase()

module.exports = {
    app,
    PORT,
};