const FurnitureModel = require("../models/furniture.model");

exports.findAll = async function (req, res) {
    if (req.administrator === true) {
        FurnitureModel.findAll({
            order: [['name', 'ASC']]
        }).then((result) => res.json(result));
    }
    else {
        FurnitureModel.findAll({
            where: { staff_id: req.userId },
            order: [['name', 'ASC']]
        }).then((result) => res.json(result));
    }
}

exports.findAllStaff = async function (req, res) {
    FurnitureModel.findAll({
        where: { staff_id: req.params.id },
        order: [['name', 'ASC']]
    }).then((result) => res.json(result));
}

exports.find = async function (req, res) {
    FurnitureModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.create = async function (req, res) {
    const price = req.body.price.replace(',', '.');

    await FurnitureModel.create({
        name: req.body.name,
        price: price,
        purchased_at: req.body.purchased_at,
        details: req.body.details,
        department_id: req.body.department_id,
        staff_id: req.body.staff_id
    }).then((result) => res.json(result));
}

exports.update = async function (req, res) {
    const price = req.body.price.replace(',', '.');

    await FurnitureModel.update({
        name: req.body.name,
        price: price,
        purchased_at: req.body.purchased_at,
        details: req.body.details,
        department_id: req.body.department_id,
        staff_id: req.body.staff_id
    },
        { where: { furniture_id: req.params.id } });

    FurnitureModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.destroy = async function (req, res) {
    await FurnitureModel.update(
        { status: false },
        { where: { furniture_id: req.params.id } });

    FurnitureModel.findAll().then((result) => res.json(result));
}