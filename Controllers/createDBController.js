const {
    selectDataAll,
    Vendor,
    insertData,
    Processor,
    VideoCard,
    logIN,
} = require("./dataBase");

function createDataBase(req, res) {
    if (logIN) {
        selectDataAll(Vendor)
            .then((Vendor) => {
                res.render("create.hbs", {
                    title: "create",
                    vendor: Vendor,
                });
            })
            .catch((err) => console.log(err));
    } else {
        res.redirect("/");
    }
}
function postCreateDataBase(req, res) {
    if (logIN) {
        if (!req.body) return res.sendStatus(400);
        console.log(req.body);
        let newNote = {
            modelName: req.body.modelName,
            vendor_id: req.body.hardVendor,
        };
        let Modul;
        if (req.body.hardType === "Processor") {
            Modul = Processor;
        } else if (req.body.hardType === "VideoCard") Modul = VideoCard;
        insertData(Modul, newNote);
        setTimeout(() => {
            res.redirect("/dataBase/hards");
        }, 1000);
    } else {
        res.redirect("/");
    }
}
module.exports = {
    createDataBase,
    postCreateDataBase,
};
