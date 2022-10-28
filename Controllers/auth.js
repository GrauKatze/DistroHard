const { selectDataOne, User, insertData, updateData, logIN } = require("./dataBase");
const bcrypt = require("bcrypt");
const { randomUUID } = require("crypto");


exports.registration = function (req, res) {
    if (req.body.login !== null && req.body.pass !== null) {
        if (req.body.pass === req.body.repPass) {
            if (identification(req.body.login) === null) {
                insertData(User, {
                    login: req.body.login, pass: () => {
                        bcrypt.hash(req.body.pass, 10, (err, hash) => {
                            return hash
                        })
                    }, canRead: true, canAdd: false, canDrop: false, canEdit: false
                })
            } else {
                const err = new Error('Login уже используется');
                err.status = 400;
                next(err);
            }
        } else {
            const err = new Error('Не совпадает пароль и подтверждение пароля!');
            err.status = 400;
            next(err);
        }
    } else {
        const err = new Error('Не оставляйте поля пустыми');
        err.status = 400;
        next(err);
    }
}
exports.getLogin = function (req, res) {
    res.render("login.hbs", {
        title: "login"
    })
}
exports.postLogin = function (req, resp) {
    console.log(req.body);
    if (req.body.login !== null && req.body.pass !== null) {
        User.findOne({ where: { login: req.body.login } }).then((user) => {
            bcrypt.compare(req.body.pass, user.pass, (err, res) => {
                if (res) {
                    let today = new Date()
                    let token = randomUUID()
                    today.setMinutes(today.getMinutes() + 10)
                    updateData(User, user.id, { token: token, tokenAge: today })
                        .then(logIN.status = true).then(logIN.login = user.login).then(logIN.token = token)
                        .then(console.log(logIN))
                }
                resp.redirect("/dataBase/hards")
                console.log(logIN)
            })
        })
    } else {
        const err = new Error('Не оставляйте поля пустыми');
        err.status = 400;
        next(err);
    }
}

exports.auth = async function (res, type) {
    let promis = new Promise((resolve, reject) => {
        if (logIN.status === true) {
            User.findOne({ where: { login: logIN.login } }).then((user) => {
                if (logIN.token === user.token) {
                    let data = new Date()
                    if (data.getDate() < user.tokenAge) {
                        if (type === "drop") {
                            resolve(user.canDrop)
                        } else if (type === "add") {
                            resolve(user.canAdd)
                        } else if (type === "edit"){
                            resolve(user.canEdit)
                        }
                    }
                } else {
                    res.redirect("/login")
                }
            })

        } else {
            res.redirect("/login")
        }
    })
    let result = await promis
    return result
}

async function identification(login) {
    selectDataOne(User, { login: login })
        .then((user) => { return user })
        .catch((err) => {
            console.log(err)
            return null
        })
}