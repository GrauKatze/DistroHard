const { logIN, User } = require("./dataBase");

exports.index = function (req, res) {
    res.render("index.hbs");
}
exports.about = function (req, res) {
    res.render("about.hbs");
};
