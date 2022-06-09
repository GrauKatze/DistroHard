const express = require("express");
const {
    indexDataBase,
    searchDataBase,
    postSearchDataBase,
    showHards,
    showDistros,
    showErrors,
} = require("../Controllers/dataBaseController");
const dataBaseRouter = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

dataBaseRouter.get("/", indexDataBase);
dataBaseRouter.get("/search", searchDataBase);
dataBaseRouter.get("/hards", showHards);
dataBaseRouter.get("/distros", showDistros);
dataBaseRouter.get("/errors", showErrors);

dataBaseRouter.post("/search", urlencodedParser, postSearchDataBase);

module.exports = { dataBaseRouter };
