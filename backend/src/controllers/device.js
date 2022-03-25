const DeviceModel = require("../models/device.model");

exports.findAll = async function (req, res) {
    if (req.administrator === true) {
        DeviceModel.findAll({
            order: [ ['name', 'ASC'] ]
        }).then((result) => res.json(result));
    }
    else {
        DeviceModel.findAll({
            where: { staff_id: req.userId },
            order: [ ['name', 'ASC'] ]
        }).then((result) => res.json(result));
    }
}

exports.find = function (req, res) {
    DeviceModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.create = async function (req, res) {
    await DeviceModel.create({
        name: req.body.name,
        price: req.body.price,
        purchased_at: req.body.purchased_at,
        details: req.body.details,
        serial: req.body.serial,
        ip: req.body.ip,
        device_type_id: req.body.device_type_id,
        department_id: req.body.department_id,
        manufacturer_id: req.body.manufacturer_id,
        staff_id: req.body.staff_id
    }).then((result) => res.json(result));
}

exports.update = async function (req, res) {
    await DeviceModel.update({
            name: req.body.name,
            price: req.body.price,
            purchased_at: req.body.purchased_at,
            details: req.body.details,
            serial: req.body.serial,
            ip: req.body.ip,
            device_type_id: req.body.device_type_id,
            department_id: req.body.department_id,
            manufacturer_id: req.body.manufacturer_id,
            staff_id: req.body.staff_id
        },
        { where: { device_id: req.params.id } });

    DeviceModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.destroy = async function (req, res) {
    await DeviceModel.update(
        { status: false },
        { where: { device_id: req.params.id } });

    DeviceModel.findAll().then((result) => res.json(result));
}