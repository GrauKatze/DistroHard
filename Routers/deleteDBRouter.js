const express = require("express");
const {
    deleteProcDB,
    deleteVideoCardDB,
    postDeleteVideoCardDB,
    postDeleteProcDB,
} = require("../Controllers/deleteBDController");

const deleteBaseRouter = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

deleteBaseRouter.get("/proc/:procID", deleteProcDB);
deleteBaseRouter.get("/videoCard/:procID", deleteVideoCardDB);
deleteBaseRouter.post("/proc/:procID", postDeleteProcDB);
deleteBaseRouter.post("/videoCard/:procID", postDeleteVideoCardDB);
module.exports = { deleteBaseRouter };
