const {
    updateData,
    Processor,
    selectDataAllFiltr,
    Vendor,
    selectDataAll,
    selectDataOne,
    VideoCard,
} = require("./dataBase");

function editProc(req, res) {
    const procID = req.params.procID;
    selectDataAll(Vendor)
        .then((vendor) => {
            selectDataAllFiltr(Processor, { id: procID }).then((proc) => {
                Vendor.findByPk(proc[0].vendor_id).then((vendorID) =>
                    res.render("Edit.hbs", {
                        obj: proc[0],
                        vendor: vendor,
                        venID: vendorID.companyName,
                    })
                );
            });
        })
        .catch((err) => console.log(err));
}
function editVideCard(req, res) {
    const videoCardID = req.params.videoCardID;
    selectDataAll(Vendor)
        .then((vendor) => {
            selectDataAllFiltr(VideoCard, { id: videoCardID }).then(
                (videoCard) => {
                    Vendor.findByPk(videoCard[0].vendor_id).then((vendorID) =>
                        res.render("Edit.hbs", {
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

function postEditProc(req, res) {
    if (!req.body) return res.sendStatus(400);
    let newNote = {
        vendor_id: req.body.vendor_id,
        modelName: req.body.modelName,
    };
    updateData(Processor, req.body.id, newNote);
}
function postEditVideoCard(req, res) {
    if (!req.body) return res.sendStatus(400);
    let newNote = {
        vendor_id: req.body.vendor_id,
        modelName: req.body.modelName,
    };
    updateData(VideoCard, req.body.id, newNote);
}

module.exports = {
    editProc,
    editVideCard,
    postEditProc,
    postEditVideoCard,
};
