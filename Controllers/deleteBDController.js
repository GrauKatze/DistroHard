const { auth } = require("./auth");
const {
    selectDataAllFiltr,
    logIN,
    Hardware,
    ErrorStatusOnHardware,
    HardwareStatusOnLinux,
} = require("./dataBase");

function getDelHard(req, res) {
    if (logIN) {
        selectDataAllFiltr(Hardware, { id: req.params.hardID }).then((hard) => {
            console.log(hard);
            res.render("delete.hbs", {
                id: hard[0].id,
                venID: hard[0].vendor_id,
                modelName: hard[0].Device
            })
        })
    }
}

async function postDelHard(req, res) {
    let answer = await auth(res,"drop")
    if (answer===true){
        if (!req.params) return res.sendStatus(400)
        console.log("start del");
        ErrorStatusOnHardware.findOne({
            raw: true,
            where: { Hardware_id: req.params.hardID }
        }).then((EROH) => {
            if (EROH !== null) EROH.forEach((el) => {
                ErrorStatusOnHardware.destroy({
                    where: { id: el.id }
                })
            })
        }).then(
            HardwareStatusOnLinux.findOne({
                raw: true,
                where: { Hardware_id: req.params.hardID }
            })
                .then((HSOL) => {
                    if (HSOL !== null) HSOL.forEach((el) => {
                        HardwareStatusOnLinux.destroy({ where: { id: el.id } })
                    })
                })
        ).then(Hardware.destroy({ where: { id: req.params.hardID } }))
            .then(res.redirect("/dataBase/hards"))
    }else{
        res.redirect("/login")
    }
}

module.exports = {
    getDelHard,
    postDelHard,
};
