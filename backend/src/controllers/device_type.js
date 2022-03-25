const DeviceTypeModel = require("../models/device_type.model");

exports.findAll = function (req, res) {
    DeviceTypeModel.findAll({
        order: [ ['name', 'ASC'] ]
    }).then((result) => res.json(result));
}

exports.find = function (req, res) {
    DeviceTypeModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.create = async function (req, res) {
    await DeviceTypeModel.create({
        name: req.body.name
    }).then((result) => res.json(result));
}

exports.update = async function (req, res) {
    await DeviceTypeModel.update(
        { name: req.body.name },
        { where: { device_type_id: req.params.id } });

    DeviceTypeModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.destroy = async function (req, res) {
    await DeviceTypeModel.update(
        { status: false },
        { where: { device_type_id: req.params.id } });

    DeviceTypeModel.findAll().then((result) => res.json(result));
}