const express = require("express");
const { about, index } = require("../Controllers/homeController")

const homeRouter = express.Router();

homeRouter.get("/", index)
homeRouter.get("/about", about)

module.exports = {
    homeRouter
}