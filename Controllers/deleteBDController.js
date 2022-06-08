const {
    Vendor,
    VideoCard,
    deleteData,
    Processor,
    selectDataAll,
    selectDataAllFiltr,
} = require("./dataBase");

function deleteProcDB(req, res) {
    const procID = req.params.procID;
    selectDataAll(Vendor)
        .then((vendor) => {
            selectDataAllFiltr(Processor, { id: procID }).then((proc) => {
                Vendor.findByPk(proc[0].vendor_id).then((vendorID) =>
                    res.render("delete.hbs", {
                        obj: proc[0],
                        vendor: vendor,
                        venID: vendorID.companyName,
                    })
                );
            });
        })
        .catch((err) => console.log(err));
}
function deleteVideoCardDB(req, res) {
    const videoCardID = req.params.videoCardID;
    selectDataAll(Vendor)
        .then((vendor) => {
            selectDataAllFiltr(VideoCard, { id: videoCardID }).then(
                (videoCard) => {
                    Vendor.findByPk(videoCard[0].vendor_id).then((vendorID) =>
                        res.render("delete.hbs", {
                            obj: videoCard[0],
                            vendor: vendor,
                            venID: vendorID.companyName,
                        })
                    );
                }
            );
        })
        .catch((err) => console.log(err));
}
function postDeleteProcDB(req, res) {
    console.log("proc");
    if (!req.params) return res.sendStatus(400);
    console.log(req.params);
    deleteData(Processor, req.params.procID);
    setTimeout(() => {
        res.redirect("/dataBase/hards");
    }, 1000);
}
function postDeleteVideoCardDB(req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    // deleteData(VideoCard, req.body.videoCardID);
    setTimeout(() => {
        res.redirect("/dataBase/hards");
    }, 1000);
}

module.exports = {
    deleteProcDB,
    deleteVideoCardDB,
    postDeleteVideoCardDB,
    postDeleteProcDB,
};
