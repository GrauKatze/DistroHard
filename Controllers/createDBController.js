const { auth } = require("./auth");
const {
    selectDataAll,
    Vendor,
    insertData,
    logIN,
    HardwareType,
    Hardware,
} = require("./dataBase");

function createDataBase(req, res) {
    if (logIN.status) {
        selectDataAll(Vendor)
            .then((Vendor) => {
                selectDataAll(HardwareType).then((HardwareType) => {
                    res.render("create.hbs", {
                        title: "create",
                        vendor: Vendor,
                        htype: HardwareType
                    });
                }).catch((err) => {
                    console.log(err)
                    res.redirect('/dataBase')
                })

            })
            .catch((err) => console.log(err));
    } else {
        res.redirect("/login");
    }
}
function postCreateDataBase(req, res) {
    let answer = auth(res, "add")
    if (answer) {
        if (!req.body) return res.sendStatus(400);
        Hardware.create({
            Device: req.body.modelName,
            vendor_id: req.body.hardVendor,
            type_id: req.body.hardType,
        }).then(() => {
            res.redirect("/dataBase/hards");
        })

    } else {
        res.redirect("/login");
    }
}
module.exports = {
    createDataBase,
    postCreateDataBase,
};
