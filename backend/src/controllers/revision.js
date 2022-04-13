const RevisionModel = require("../models/revision.model");

exports.findAll = function (req, res) {
    RevisionModel.findAll().then((result) => res.json(result));
}

exports.findAllDevice = function (req, res) {
    RevisionModel.findAll({
        where: { device_id: req.params.id }
    }).then((result) => res.json(result));
}

exports.find = function (req, res) {
    RevisionModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.create = async function (req, res) {
    await RevisionModel.create({
        date: req.body.date,
        device_id: req.body.device_id,
        staff_id: req.body.staff_id
    }).then((result) => res.json(result));
}

exports.update = async function (req, res) {
    await RevisionModel.update({
            status: req.body.status
        },
        { where: { revision_id: req.params.id } });

    RevisionModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.destroy = async function (req, res) {
    await RevisionModel.destroy(
        { where: { revision_id: req.params.id } });

    RevisionModel.findAll().then((result) => res.json(result));
}