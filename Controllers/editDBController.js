const {
    updateData,
    Processor,
    selectDataAllFiltr,
    Vendor,
    selectDataAll,
    selectDataOne,
    VideoCard,
    DistroLinux,
    ProcessorStatusOnLinux,
    VideoCardStatusOnLinux,
    logIN,
} = require("./dataBase");

function editProc(req, res) {
    if (logIN) {
        const procID = req.params.procID;
        Vendor.findAll()
            .then((vendors) => {
                Processor.findOne({ where: { id: procID } }).then((proc) => {
                    Vendor.findByPk(proc.vendor_id).then((vendor) => {
                        DistroLinux.findAll().then((linux) =>
                            res.render("Edit.hbs", {
                                obj: proc,
                                linux: linux,
                                vendor: vendors,
                                venID: vendor.companyName,
                            })
                        );
                    });
                });
            })
            .catch((err) => console.log(err));
    } else {
        res.redirect("/");
    }
}
function editVideoCard(req, res) {
    if (logIN) {
        const videoCardID = req.params.videoCardID;
        Vendor.findAll()
            .then((vendors) => {
                VideoCard.findOne({ where: { id: videoCardID } }).then(
                    (videoCard) => {
                        Vendor.findByPk(videoCard.vendor_id).then((vendor) => {
                            DistroLinux.findAll().then((linux) =>
                                res.render("Edit.hbs", {
                                    obj: videoCard,
                                    linux: linux,
                                    vendor: vendors,
                                    venID: vendor.companyName,
                                })
                            );
                        });
                    }
                );
            })
            .catch((err) => console.log(err));
    } else {
        res.redirect("/");
    }
}

function postEditProc(req, res) {
    if (logIN) {
        if (!req.body) return res.sendStatus(400);
        console.log(req.body);
        console.log(req.params);
        Processor.update(
            {
                modelName: req.body.modelName,
                vendor_id: req.body.Vendor,
            },
            {
                where: {
                    id: req.params.procID,
                },
            }
        )
            .then(() => {
                if (req.body.LinuxStatus !== null) {
                    ProcessorStatusOnLinux.findOne({
                        where: {
                            Processor_id: req.params.procID,
                            DistLinux_id: req.body.linuxVendor,
                        },
                    }).then((PSOL) => {
                        if (PSOL !== null) {
                            ProcessorStatusOnLinux.update(
                                { Status: req.body.linuxStatus },
                                {
                                    where: {
                                        Processor_id: req.params.procID,
                                        DistLinux_id: req.body.linuxVendor,
                                    },
                                }
                            );
                        } else {
                            ProcessorStatusOnLinux.create({
                                Processor_id: req.params.procID,
                                DistLinux_id: req.body.linuxVendor,
                                Status: req.body.linuxStatus,
                            });
                        }
                    });
                }
            })
            .then(() => res.redirect("/dataBase/hards"));
    } else {
        res.redirect("/");
    }
}
function postEditVideoCard(req, res) {
    if (logIN) {
        if (!req.body) return res.sendStatus(400);
        console.log(req.body);
        console.log(req.params);
        VideoCard.update(
            {
                modelName: req.body.modelName,
                vendor_id: req.body.Vendor,
            },
            {
                where: {
                    id: req.params.videoCardID,
                },
            }
        )
            .then(() => {
                if (req.body.LinuxStatus !== null) {
                    VideoCardStatusOnLinux.findOne({
                        where: {
                            VideoCard_id: req.params.videoCardID,
                            DistLinux_id: req.body.linuxVendor,
                        },
                    }).then((PSOL) => {
                        if (PSOL !== null) {
                            VideoCardStatusOnLinux.update(
                                { Status: req.body.linuxStatus },
                                {
                                    where: {
                                        VideoCard_id: req.params.videoCardID,
                                        DistLinux_id: req.body.linuxVendor,
                                    },
                                }
                            );
                        } else {
                            VideoCardStatusOnLinux.create({
                                VideoCard_id: req.params.videoCardID,
                                DistLinux_id: req.body.linuxVendor,
                                Status: req.body.linuxStatus,
                            });
                        }
                    });
                }
            })
            .then(() => res.redirect("/dataBase/hards"));
    } else {
        res.redirect("/");
    }
}

module.exports = {
    editProc,
    editVideoCard,
    postEditProc,
    postEditVideoCard,
};
