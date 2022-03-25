const bcrypt = require('bcrypt');
const StaffModel = require("../models/staff.model");

exports.findAll = function (req, res) {
    if(req.administrator === true){
        StaffModel.findAll({
            order: [ ['first_name', 'ASC'] ],
        }).then((result) => { res.json(result) });
    }
    else{
        StaffModel.findAll({
            where: { staff_id: req.userId }
        }).then((result) => res.json(result));
    }
}

exports.find = function (req, res) {
    StaffModel.findByPk(req.params.id, { 
        attributes: ['first_name', 'last_name']
    }).then((result) => res.json(result));
}

exports.getByPk = async function (staff_id) {
    var staffData = await StaffModel.findByPk(staff_id, {
        attributes: ['first_name', 'last_name'] });
    return staffData.dataValues;
}

exports.create = async function (req, res) {
    await StaffModel.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: await bcrypt.hashSync(req.body.password, 10),
        administrator: req.body.administrator
    }).then((result) => res.json(result));
}

exports.update = async function (req, res) {
    await StaffModel.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            administrator: req.body.administrator
        },
        { where: { staff_id: req.params.id } });

    StaffModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.updatePassword = async function (req, res) {
    await StaffModel.update(
        { password: await bcrypt.hashSync(req.body.password, 10) },
        { where: { staff_id: req.params.id } });

    StaffModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.destroy = async function (req, res) {
    await StaffModel.update(
        { status: false },
        { where: { staff_id: req.params.id } });

    StaffModel.findAll().then((result) => res.json(result));
}

exports.initial = async function () {
    var staffData = await StaffModel.findByPk(1, {
        attributes: ['first_name', 'last_name'] });

    if(!staffData){
        StaffModel.create({ 
            staff_id: 1,  
            first_name: "Administrator", 
            last_name: "TI", 
            email: "ti@localhost", 
            password: await bcrypt.hashSync("helpdesk", 10), 
            administrator: 1
        });
    }
}