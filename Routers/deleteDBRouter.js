const express = require("express");
const {
    getDelHard,
    postDelHard,
} = require("../Controllers/deleteBDController");

const deleteBaseRouter = express.Router();
deleteBaseRouter.get("/hardware/:hardID", getDelHard);
deleteBaseRouter.post("/hardware/:hardID", postDelHard);
module.exports = { deleteBaseRouter };
