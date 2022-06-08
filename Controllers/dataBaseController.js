const { Hards, returnResultFind, selectDataAll, Vendor, Processor, VideoCard } = require("./dataBase");

function createDataBase(req, res) {
    res.send("add data")
}
function delleteDataBase(req, res) {
    res.send("del data")
}
function indexDataBase(req, res) {
    res.render("dataBase.hbs")
}
function searchDataBase(req, res) {
    selectDataAll(Vendor).then(Vendor => {
        selectDataAll(Processor).then(Processor => {
            selectDataAll(VideoCard).then(VideoCard => {
                res.render("DBsearch.hbs", {
                    title: 'Search',
                    vendor: Vendor,
                    processor: Processor,
                    videoCard: VideoCard

                });
            })
        })
    }).catch(err => console.log(err));
}


module.exports = {
    indexDataBase,
    delleteDataBase,
    createDataBase,
    searchDataBase
}