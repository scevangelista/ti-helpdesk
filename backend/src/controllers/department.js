const DepartmentModel = require("../models/department.model");

exports.findAll = function (req, res) {
    DepartmentModel.findAll({
        order: [ ['name', 'ASC'] ]
    }).then((result) => res.json(result));
}

exports.find = function (req, res) {
    DepartmentModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.create = async function (req, res) {
    await DepartmentModel.create({
        name: req.body.name
    }).then((result) => res.json(result));
}

exports.update = async function (req, res) {
    await DepartmentModel.update(
        { name: req.body.name },
        { where: { department_id: req.params.id } });

    DepartmentModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.destroy = async function (req, res) {
    await DepartmentModel.update(
        { status: false },
        { where: { department_id: req.params.id } });

    DepartmentModel.findAll().then((result) => res.json(result));
}