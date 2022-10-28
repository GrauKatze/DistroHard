const { auth } = require("./auth");
const {
    Vendor,
    DistroLinux,
    logIN,
    Hardware,
    HardwareStatusOnLinux,
} = require("./dataBase");

function getEditHard(req, res) {
    if (logIN.status) {
        const hardID = req.params.hardID;
        Hardware.findByPk(hardID).then((hard) => {
            Vendor.findAll().then((vendors) => {
                Vendor.findByPk(hard.vendor_id).then((vendor) => {
                    DistroLinux.findAll().then((linuxes) => {
                        DistroLinux.findByPk(hard.DistLinux_id).then((linux) => {
                            res.render("Edit.hbs", {
                                hard: hard,
                                venID: vendor.companyName,
                                vendors: vendors,
                                linuxes: linuxes
                            })
                        })
                    })
                })
            })
        })
    } else {
        res.redirect("/login")
    }
}

async function postEditHard(req, res) {
    let answer = await auth(res, "edit")
    if (answer === true){
        if (!req.body) return res.sendStatus(400);
        console.log(req.body);
        console.log(req.params);
        // [Object: null prototype] {
        //     Vendor: '1',
        //     modelName: '',
        //     linuxVendor: '0',
        //     linuxStatus: 'G'
        //   }
        //   { hardID: '1' }

        console.log(req.body.linuxStatus);


        Hardware.findByPk(req.params.hardID).then((hard) => {
            if (req.body.modelName !== '') {
                var modelName = req.body.modelName
            } else {
                var modelName = hard.Device;
            }
            hard.update({ Device: modelName, Vendor: req.body.Vendor })
        }).then(() => {
            if (req.body.LinuxStatus !== null) {
                HardwareStatusOnLinux.findOrCreate({
                    where: {
                        Hardware_id: req.params.hardID,
                        DistroLinux_id: req.body.linuxVendor
                    },
                    default: {
                        Hardware_id: req.params.hardID,
                        Status: req.body.linuxStatus,
                        DistroLinux_id: req.body.linuxVendor,
                    }
                })
            }
        }).then(() => {
            res.redirect("/dataBase/Hards")
        })
    } else {
        res.redirect("/login")
    }
}

module.exports = {
    getEditHard,
    postEditHard
};
