const express = require("express");
const { login, getLogin, postLogin } = require("../Controllers/auth");
const { about, index, } = require("../Controllers/homeController");

const homeRouter = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

homeRouter.get("/", index);
homeRouter.get("/about", about);
homeRouter.get("/login", getLogin)
homeRouter.post("/login", urlencodedParser,postLogin)

module.exports = {
    homeRouter,
};
