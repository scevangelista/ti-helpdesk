const TicketTypeModel = require("../models/ticket_type.model");

exports.findAll = function (req, res) {
    TicketTypeModel.findAll({
        order: [ ['name', 'ASC'] ]
    }).then((result) => res.json(result));
}

exports.find = function (req, res) {
    TicketTypeModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.create = async function (req, res) {
    await TicketTypeModel.create({
        name: req.body.name,
        description: req.body.description
    }).then((result) => res.json(result));
}

exports.update = async function (req, res) {
    await TicketTypeModel.update({
            name: req.body.name,
            description: req.body.description
        },
        { where: { ticket_type_id: req.params.id } });

    TicketTypeModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.destroy = async function (req, res) {
    await TicketTypeModel.update(
        { status: false },
        { where: { ticket_type_id: req.params.id } });

    TicketTypeModel.findAll().then((result) => res.json(result));
}