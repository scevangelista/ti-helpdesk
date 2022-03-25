const PingModel = require("../models/ping.model");

exports.findAll = function (req, res) {
    PingModel.findAll().then((result) => res.json(result));
}

exports.find = function (req, res) {
    PingModel.findAll({
        where: { device_id: req.params.id }
    }).then((result) => res.json(result));
}

exports.create = async function (req, res) {
    await PingModel.create({
        device_id: req.body.device_id,
        time: req.body.time
    }).then((result) => res.json(result));
}

exports.update = async function (req, res) {
    await PingModel.update(
        { time: req.body.time },
        { where: {
                device_id: req.params.device_id,
                created_ad: req.params.created_ad
            } });

    PingModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.destroy = async function (req, res) {
    await PingModel.destroy(
        { where: { device_id: req.params.id } });

    PingModel.findAll().then((result) => res.json(result));
}