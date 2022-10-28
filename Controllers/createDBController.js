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
    let answer = auth(res,"add")
    console.log(answer);
    if (answer) {
        if (!req.body) return res.sendStatus(400);
        insertData(Hardware, {
            Device: req.body.modelName,
            vendor_id: req.body.hardVendor,
            type_id: req.body.hardType,
        })
        setTimeout(() => {
            res.redirect("/dataBase/hards");
        }, 1000);
    } else {
        res.redirect("/login");
    }
}
module.exports = {
    createDataBase,
    postCreateDataBase,
};
