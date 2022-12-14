const {
    selectDataAll,
    Vendor,
    Processor,
    VideoCard,
    selectDataOne,
    selectDataAllFiltr,
    ProcessorStatusOnLinux,
    VideoCardStatusOnLinux,
    DistroLinux,
    Errors,
} = require("./dataBase");

function showHards(req, res) {
    selectDataAll(Processor).then((proc) => {
        selectDataAll(VideoCard).then((videoCard) => {
            res.render("Hards.hbs", {
                title: "Hards",
                proc: proc,
                videoCard: videoCard,
            });
        });
    });
}
function showDistros(req, res) {
    selectDataAll(DistroLinux).then((distr) => {
        res.render("Distros.hbs", {
            title: "Distros",
            distr: distr,
        });
    });
}
function showErrors(req, res) {
    selectDataAll(Errors).then((err) => {
        res.render("Errors.hbs", {
            title: "Errors",
            err: err,
        });
    });
}

function indexDataBase(req, res) {
    res.render("dataBase.hbs");
}
function searchDataBase(req, res, next) {
    selectDataAll(Vendor)
        .then((Vendor) => {
            selectDataAll(Processor).then((Processor) => {
                selectDataAll(VideoCard).then((VideoCard) => {
                    res.render("DBsearch.hbs", {
                        title: "Search",
                        vendor: Vendor,
                        processor: Processor,
                        videoCard: VideoCard,
                    });
                });
            });
        })
        .catch((err) => console.log(err));
}

async function postSearchDataBase(req, res) {
    let hardStatus = [];
    Processor.findOne({ where: { modelName: req.body.procModel } }).then(
        (processor) => {
            ProcessorStatusOnLinux.findAll({
                where: { Processor_id: processor.id },
            })
                .then((procStatusLinux) => {
                    procStatusLinux.forEach((pSL) => {
                        DistroLinux.findAll({
                            where: { id: pSL.DistLinux_id },
                        }).then((procData) => {
                            hardStatus.push({
                                hardModel: processor.modelName,
                                OS: procData[0].vendor,
                                status: pSL.Status,
                            });
                        });
                    });
                })
                .then(() => {
                    VideoCard.findOne({
                        where: { modelName: req.body.videoCardModel },
                    }).then((videoCard) => {
                        VideoCardStatusOnLinux.findAll({
                            where: { VideoCard_id: videoCard.id },
                        })
                            .then((videoCardStatusLinux) => {
                                videoCardStatusLinux.forEach((vcSL) => {
                                    DistroLinux.findAll({
                                        where: { id: vcSL.DistLinux_id },
                                    }).then((videoCardData) => {
                                        hardStatus.push({
                                            hardModel: videoCard.modelName,
                                            OS: videoCardData[0].vendor,
                                            status: vcSL.Status,
                                        });
                                    });
                                });
                            })
                            .then(() =>
                                setTimeout(function () {
                                    res.render("results.hbs", {
                                        title: "result",
                                        result: hardStatus,
                                    });
                                    console.log(hardStatus);
                                }, 2000)
                            );
                    });
                });
        }
    );
}

module.exports = {
    indexDataBase,
    searchDataBase,
    postSearchDataBase,
    showHards,
    showDistros,
    showDistros,
    showErrors,
};
