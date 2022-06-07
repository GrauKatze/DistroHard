const express = require("express");
const { createDataBase, delleteDataBase, indexDataBase } = require("../Controllers/dataBaseController")

const dataBaseRouter = express.Router();

dataBaseRouter.get('/', indexDataBase)
dataBaseRouter.get('/create', createDataBase)
dataBaseRouter.get('/delete', delleteDataBase)

module.exports = { dataBaseRouter }