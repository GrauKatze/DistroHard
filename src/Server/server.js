const express = require("express");
const cors = require("cors");
const path = require("path");
const { text } = require("express");

const router = express.Router();
const app = express();

const viewsDirPath = path.join(__dirname, "../Client/www/views");
const indexDirPath = path.join(__dirname, "../Client/www/");

const PORT = 3000;

app.use("/css", express.static(path.join(__dirname, "../Client/www")));
app.use("/js", express.static(path.join(__dirname, "../Client/www")));
app.use("/jquery", express.static(path.join(__dirname, "../Client/www/")));
app.use(express.json());

//API

app.get("/", function (req, res) {
  res.status(202).sendFile(indexDirPath + "/index.html");
});
app.get("/about", function (req, res) {
  res.status(202).sendFile(viewsDirPath + "/about.html");
});
app.get("/database", function (req, res) {
  res.status(202).sendFile(viewsDirPath + "/dataBase.html");
});
app.get("/distr/:distrName", function (req, res) {
  res.status(202).sendFile(viewsDirPath + "/Distr.html");
  // res.send(req.params);
});

// app.post('/', (req, res) => {
//   res.status(200).json({ pi: req.body.a })
// })

app.use(function (req, res) {
  res.status(404).sendFile(viewsDirPath + "/404.html");
});
app.get(`/pipi`, function (req, res) {
  res.send(text);
});

// app.listen(PORT, () => console.log(`My port is ${PORT}`))

module.exports = {
  app,
  PORT,
};
