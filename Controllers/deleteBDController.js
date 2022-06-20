const {
    Vendor,
    VideoCard,
    deleteData,
    Processor,
    selectDataAll,
    selectDataAllFiltr,
    ErrorStatusOnProcessor,
    ProcessorStatusOnLinux,
    ErrorStatusOnVideoCard,
    VideoCardStatusOnLinux,
    logIN,
} = require("./dataBase");

function deleteProcDB(req, res) {
    if (logIN) {
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
    } else {
        res.redirect("/");
    }
}
function deleteVideoCardDB(req, res) {
    if (logIN) {
        const videoCardID = req.params.videoCardID;
        selectDataAll(Vendor)
            .then((vendor) => {
                selectDataAllFiltr(VideoCard, { id: videoCardID }).then(
                    (videoCard) => {
                        Vendor.findByPk(videoCard[0].vendor_id).then(
                            (vendorID) =>
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
    } else {
        res.redirect("/");
    }
}
function postDeleteProcDB(req, res) {
    if (logIN) {
        console.log("proc");
        if (!req.params) return res.sendStatus(400);
        console.log(req.params);

        ErrorStatusOnProcessor.findAll({
            raw: true,
            where: { Processor_id: req.params.procID },
        })
            .then((ESONP) => {
                if (ESONP !== null)
                    ESONP.forEach((el) => {
                        ErrorStatusOnProcessor.destroy({
                            where: { id: el.id },
                        });
                    });
            })
            .then(
                ProcessorStatusOnLinux.findAll({
                    where: { Processor_id: req.params.procID },
                })
                    .then((PSOL) => {
                        if (PSOL !== null)
                            PSOL.forEach((el) => {
                                ProcessorStatusOnLinux.destroy({
                                    where: { id: el.id },
                                });
                            });
                    })
                    .then(() =>
                        Processor.destroy({ where: { id: req.params.procID } })
                    )
                    .then(() => res.redirect("/dataBase/hards"))
            );
    } else {
        res.redirect("/");
    }
}
function postDeleteVideoCardDB(req, res) {
    if (logIN) {
        if (!req.params) return res.sendStatus(400);
        console.log(req.params);
        ErrorStatusOnVideoCard.findAll({
            where: { VideoCard_id: req.params.videoCardID },
        })
            .then((EROVC) => {
                if (EROVC !== null)
                    EROVC.forEach((el) => {
                        ErrorStatusOnVideoCard.destroy({
                            where: { id: el.id },
                        });
                    });
            })
            .then(() =>
                VideoCardStatusOnLinux.findAll({
                    where: { VideoCard_id: req.params.videoCardID },
                })
                    .then((VCSOL) => {
                        if (VCSOL !== null)
                            VCSOL.forEach((el) =>
                                VideoCardStatusOnLinux.destroy({
                                    where: { id: el.id },
                                })
                            );
                    })
                    .then(
                        VideoCard.destroy({
                            where: { id: req.params.videoCardID },
                        })
                    )
                    .then(() => res.redirect("/dataBase/hards"))
            );
    } else {
        res.redirect("/");
    }
}

module.exports = {
    deleteProcDB,
    deleteVideoCardDB,
    postDeleteVideoCardDB,
    postDeleteProcDB,
};
