const express = require("express");
const { login, getLogin, postLogin, getRegistration, postRegistration } = require("../Controllers/auth");
const { about, index, } = require("../Controllers/homeController");

const homeRouter = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

homeRouter.get("/", index);
homeRouter.get("/about", about);
homeRouter.get("/login", getLogin)
homeRouter.post("/login", urlencodedParser, postLogin)
homeRouter.get("/registration", getRegistration)
homeRouter.post("/registration", urlencodedParser, postRegistration)

module.exports = {
    homeRouter,
};
