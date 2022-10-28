const {
    selectDataAll,
    Vendor,
    Processor,
    VideoCard,
    ProcessorStatusOnLinux,
    VideoCardStatusOnLinux,
    DistroLinux,
    Errors,
    Hardware,
    HardwareStatusOnLinux
} = require("./dataBase");

function showHards(req, res) {
    selectDataAll(Hardware).then((hw) => {
        res.render("DBViews/Hards.hbs", {
            title: "Hards",
            hard: hw
        });
    });
}
function showDistros(req, res) {
    selectDataAll(DistroLinux).then((distr) => {
        Vendor.findAll({ where: { id: 1 } }).then((vendor_name) => {
            // distr.vendor_id = vendor_name
            res.render("DBViews/Distros.hbs", {
                title: "Distros",
                distr: distr,
            });
            console.log(distr)
        })
    });
}
function showErrors(req, res) {
    selectDataAll(Errors).then((err) => {
        res.render("DBViews/Errors.hbs", {
            title: "Errors",
            err: err,
        });
    });
}

function indexDataBase(req, res) {
    res.render("DBViews/dataBase.hbs");
} showDistros

function getSearchDataBase(req, res) {
    Hardware.findAll({ where: { type_id: 0 } }).then((proc) => {
        Hardware.findAll({ where: { type_id: 1 } }).then((videoCard) => {
            res.render("DBViews/DBsearch.hbs", {
                title: "search",
                Proc: proc,
                videoCard: videoCard
            })
        })
    }).catch((err) => console.log(err))
}

async function postSearchHards(req, res) {
    console.log(req.body);
    let hardStatus = [];
    Hardware.findOne({ where: { id: req.body.Proc } }).then((proc) => {
        HardwareStatusOnLinux.findAll({ where: { Hardware_id: proc.id } })
            .then((PSOL) => {
                PSOL.forEach((pSL) => {
                    DistroLinux.findAll({
                        where: { id: pSL.DistroLinux_id },
                    }).then((distroLinux) => {
                        console.log(distroLinux);
                        hardStatus.push({
                            hardModel: proc.Device,
                            OS: distroLinux[0].product + ' ' + distroLinux[0].version,
                            status: pSL.Status,
                        })
                    })
                })
            }).then(() => {
                Hardware.findOne({ where: { id: 1 } }).then((videoCard) => {
                    HardwareStatusOnLinux.findAll({ where: { Hardware_id: videoCard.id } })
                        .then((VSOL) => {
                            VSOL.forEach((vSL) => {
                                DistroLinux.findAll({
                                    where: { id: vSL.DistroLinux_id },
                                }).then((distroLinux) => {
                                    hardStatus.push({
                                        hardModel: videoCard.Device,
                                        OS: distroLinux[0].product + ' ' + distroLinux[0].version,
                                        status: vSL.Status,
                                    })
                                })
                            })
                        })
                })
            }).then(() =>
                setTimeout(function () {
                    res.render("results.hbs", {
                        title: "result",
                        result: hardStatus,
                    });
                    console.log(hardStatus);
                }, 2000)
            )
    })
}

module.exports = {
    indexDataBase,
    showHards,
    showDistros,
    showDistros,
    showErrors,
    getSearchDataBase,
    postSearchHards
};
