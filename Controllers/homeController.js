const { user } = require("pg/lib/defaults");
const { logIN, User } = require("./dataBase");

exports.index = function (req, res) {
    if (logIN) {
        res.render("index.hbs");
    } else {
        res.render("login.hbs");
    }
};
exports.postLogin = function (req, res) {
    if (!req.params) return res.sendStatus(400);
    console.log(req.body);
    User.findOne({ where: { login: req.body.login } }).then((user) => {
        if (user) {
            if (user.pass === req.body.pass) {
                // logIN = true;
                res.redirect("/", {
                    // user: req.body.login,
                });
            }
        } else {
            res.redirect("/");
        }
    });
};

exports.about = function (req, res) {
    res.render("about.hbs");
};
