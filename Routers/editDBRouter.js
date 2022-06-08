const express = require("express");
const {
    editProc,
    editVideCard,
    postEditProc,
    postEditVideoCard,
} = require("../Controllers/editDBController");

const editRouter = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

editRouter.get("/proc/:procID", editProc);
editRouter.get("/videCard", editVideCard);
editRouter.post("/proc/:procID", urlencodedParser, postEditProc);
editRouter.post("/videoCard/:videoCardID", urlencodedParser, postEditVideoCard);

module.exports = {
    editRouter,
};
