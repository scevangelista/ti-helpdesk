const ActivityModel = require("../models/activity.model");

exports.findAll = function (req, res) {
    ActivityModel.findAll().then((result) => res.json(result));
}

exports.find = function (req, res) {
    ActivityModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.create = async function (req, res) {
    await ActivityModel.create({
        staff_id: req.body.staff_id,
        ticket_id: req.body.ticket_id,
        description: req.body.description,
        automatic: req.body.automatic
    }).then((result) => res.json(result));
}

exports.update = async function (req, res) {
    await ActivityModel.update(
        {
            staff_id: req.body.staff_id,
            ticket_id: req.body.ticket_id,
            description: req.body.description,
            automatic: req.body.automatic
        },
        { where: { activity_id: req.params.id } });

    ActivityModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.destroy = async function (req, res) {
    await ActivityModel.update(
        { status: false },
        { where: { activity_id: req.params.id } });

    ActivityModel.findAll().then((result) => res.json(result));
}