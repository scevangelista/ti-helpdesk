const bcrypt = require('bcrypt');
const StaffModel = require("../models/staff.model");
const AuthModel = require("../models/auth.model");

exports.login = async function (req, res) {
    if (req.body.email != null && req.body.password != null) {
        const staffRecord = await StaffModel.findOne({
            where: [
                { email: req.body.email }, 
                { status: true }
            ],
            order: [['created_at', 'DESC']]
        });
        if (staffRecord) {
            const matched = await bcrypt.compare(req.body.password, staffRecord.password);
            if (matched) {
                authToken = await bcrypt.hashSync(Math.random().toString(36).substring(0, 30), 10);

                await AuthModel.update(
                    { status: false },
                    { where: { staff_id: staffRecord.staff_id } });

                await AuthModel.create({
                    staff_id: staffRecord.staff_id,
                    administrator: staffRecord.administrator,
                    token: authToken,
                    status: 1
                }).then((result) => { res.json(result) });
            }
            else {
                res.json({ staff_id: 0 }); 
            }
        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.json({ staff_id: 0 });
        }
    }
}

exports.verify = async function (req, res) {
    const token = req.headers['token'];
    if (!token) res.status(200).json({ auth: false, message: 'No token provided.' });

    const authRecord = await AuthModel.findOne({
        where: [
            { token: token }, 
            { status: true }
        ] });

    if (authRecord)
        res.status(200).json({ auth: true });
    else 
        res.status(200).json({ auth: false, message: 'Failed to authenticate token.' });
}

exports.destroy = async function (req, res) {
    await AuthModel.update(
        { status: false },
        { where: { token: req.params.token } });
}

exports.logged = async function (req, res, next) {
    const token = req.headers['token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    const authRecord = await AuthModel.findOne({
        where: [
            { token: token }, 
            { status: true }
        ] });

    if (authRecord) {
        req.userId = authRecord.staff_id;
        req.administrator = authRecord.administrator;
        next();
    }
    else {
        return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    }
}