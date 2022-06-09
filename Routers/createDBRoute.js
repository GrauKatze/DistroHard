const express = require("express");
const {
    createDataBase,
    postCreateDataBase,
} = require("../Controllers/createDBController");

const createRouter = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

createRouter.get("/", createDataBase);
createRouter.post("/", urlencodedParser, postCreateDataBase);
module.exports = {
    createRouter,
};
