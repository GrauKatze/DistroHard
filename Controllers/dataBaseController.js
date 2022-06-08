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
    let procStatus = [];
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    selectDataOne(Processor, { modelName: req.body.procModel }).then(
        (processor) => {
            selectDataAllFiltr(ProcessorStatusOnLinux, {
                Processor_id: processor.id,
            }).then((procLinuxResult) => {
                console.log(procLinuxResult);
                procLinuxResult.forEach((el) => {
                    selectDataAllFiltr(DistroLinux, {
                        id: el.DistLinux_id,
                    }).then((data) => {
                        procStatus.push({
                            procModel: processor.modelName,
                            OS: data[0].vendor,
                            status: el.Status,
                        });
                    });
                });
            });
        }
    );
    let videoCardStatus = [];

    selectDataOne(VideoCard, { modelName: req.body.videoCardModel }).then(
        (videoCard) => {
            selectDataAllFiltr(VideoCardStatusOnLinux, {
                VideoCard_id: videoCard.id,
            }).then((videoCardLinuxResult) => {
                console.log(videoCardLinuxResult);
                videoCardLinuxResult.forEach((el) => {
                    selectDataAllFiltr(DistroLinux, {
                        id: el.DistLinux_id,
                    }).then((data) => {
                        videoCardStatus.push({
                            videoCardModel: videoCard.modelName,
                            OS: data[0].vendor,
                            status: el.Status,
                        });
                    });
                });
            });
        }
    );
    setTimeout(function () {
        res.send(videoCardStatus);
    }, 1000);
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
