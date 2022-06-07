function createDataBase(req, res) {
    res.send("add data")
}
function delleteDataBase(req, res) {
    res.send("del data")
}
function indexDataBase(req, res) {
    res.render("dataBase.hbs")
}

module.exports = {
    indexDataBase,
    delleteDataBase,
    createDataBase
}