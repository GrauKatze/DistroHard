const express = require("express");
const {
    editProc,
    editVideoCard,
    postEditProc,
    postEditVideoCard,
} = require("../Controllers/editDBController");

const editRouter = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

editRouter.get("/proc/:procID", editProc);
editRouter.get("/videoCard/:videoCardID", editVideoCard);
editRouter.post("/proc/:procID", urlencodedParser, postEditProc);
editRouter.post("/videoCard/:videoCardID", urlencodedParser, postEditVideoCard);

module.exports = {
    editRouter,
};
