const express = require("express");
const {
    getEditHard,
    postEditHard,
} = require("../Controllers/editDBController");

const editRouter = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

editRouter.get("/hard/:hardID", getEditHard)

editRouter.post("/hard/:hardID", urlencodedParser, postEditHard);

module.exports = {
    editRouter,
};
