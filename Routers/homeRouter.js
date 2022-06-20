const express = require("express");
const { about, index, postLogin } = require("../Controllers/homeController");

const homeRouter = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

homeRouter.get("/", index);
homeRouter.get("/about", about);
homeRouter.post("/", urlencodedParser, postLogin);

module.exports = {
    homeRouter,
};
