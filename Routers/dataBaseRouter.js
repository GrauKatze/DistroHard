const express = require("express");
const {
    indexDataBase,
    searchDataBase,
    postSearchDataBase,
    showHards,
    showDistros,
    showErrors,
    getSearchDataBase,
    postSearchHards
} = require("../Controllers/dataBaseController");
const dataBaseRouter = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

dataBaseRouter.get("/", indexDataBase);
dataBaseRouter.get("/search", getSearchDataBase);
dataBaseRouter.get("/hards", showHards);
dataBaseRouter.get("/distros", showDistros);
dataBaseRouter.get("/errors", showErrors);

dataBaseRouter.post("/search", urlencodedParser, postSearchHards);

module.exports = { dataBaseRouter };
