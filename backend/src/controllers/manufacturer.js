const ManufacturerModel = require("../models/manufacturer.model");

exports.findAll = function (req, res) {
    ManufacturerModel.findAll({
        order: [ ['name', 'ASC'] ]
    }).then((result) => res.json(result));
}

exports.find = function (req, res) {
    ManufacturerModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.create = async function (req, res) {
    await ManufacturerModel.create({
        name: req.body.name
    }).then((result) => res.json(result));
}

exports.update = async function (req, res) {
    await ManufacturerModel.update(
        { name: req.body.name },
        { where: { manufacturer_id: req.params.id } });

    ManufacturerModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.destroy = async function (req, res) {
    await ManufacturerModel.update(
        { status: false },
        { where: { manufacturer_id: req.params.id } });

    ManufacturerModel.findAll().then((result) => res.json(result));
}