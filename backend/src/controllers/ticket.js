const TicketModel = require("../models/ticket.model");

exports.findAll = function (req, res) {
    TicketModel.findAll().then((result) => res.json(result));
}

exports.find = function (req, res) {
    TicketModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.create = async function (req, res) {
    await TicketModel.create({
        owner_staff_id: req.body.owner_staff_id,
        designated_staff_id: req.body.designated_staff_id,
        device_id: req.body.device_id,
        ticket_type_id: req.body.ticket_type_id,
        title: req.body.title,
        description: req.body.description
    }).then((result) => res.json(result));
}

exports.update = async function (req, res) {
    await TicketModel.update({
            owner_staff_id: req.body.owner_staff_id,
            designated_staff_id: req.body.designated_staff_id,
            device_id: req.body.device_id,
            ticket_type_id: req.body.ticket_type_id,
            title: req.body.title,
            description: req.body.description,
            satisfaction_note: req.body.satisfaction_note
        },
        { where: { ticket_id: req.params.id } });

    TicketModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.destroy = async function (req, res) {
    await TicketModel.update( 
        { status: false },
        { where: { ticket_id: req.params.id } });

    TicketModel.findAll().then((result) => res.json(result));
}