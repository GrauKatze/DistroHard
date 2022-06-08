const express = require("express");
const { createDataBase, delleteDataBase, indexDataBase, searchDataBase } = require("../Controllers/dataBaseController")

const dataBaseRouter = express.Router();

dataBaseRouter.get('/', indexDataBase)
dataBaseRouter.get('/create', createDataBase)
dataBaseRouter.get('/delete', delleteDataBase)
dataBaseRouter.get('/search', searchDataBase)


module.exports = { dataBaseRouter }