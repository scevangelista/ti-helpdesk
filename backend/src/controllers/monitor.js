const MonitorModel = require("../models/monitor.model");

exports.findAll = function (req, res) {
    MonitorModel.findAll().then((result) => res.json(result));
}

exports.find = function (req, res) {
    MonitorModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.create = async function (req, res) {
    await MonitorModel.create({
        device_id: req.body.device_id,
        ip: req.body.ip,
        cpu: req.body.cpu,
        cpu_usage: req.body.cpu_usage,
        cpu_usage_details: req.body.cpu_usage_details,
        memory: req.body.memory,
        memory_usage: req.body.memory_usage,
        memory_usage_details: req.body.memory_usage_details,
        storage: req.body.storage,
        storage_usage: req.body.storage_usage,
        storage_usage_details: req.body.storage_usage_details,
        user_logged: req.body.user_logged,
        uptime: req.body.uptime,
        installed_apps: req.body.installed_apps
    }).then((result) => res.json(result));
}

exports.update = async function (req, res) {
    await MonitorModel.update({
            device_id: req.body.device_id,
            ip: req.body.ip,
            cpu: req.body.cpu,
            cpu_usage: req.body.cpu_usage,
            cpu_usage_details: req.body.cpu_usage_details,
            memory: req.body.memory,
            memory_usage: req.body.memory_usage,
            memory_usage_details: req.body.memory_usage_details,
            storage: req.body.storage,
            storage_usage: req.body.storage_usage,
            storage_usage_details: req.body.storage_usage_details,
            user_logged: req.body.user_logged,
            uptime: req.body.uptime,
            installed_apps: req.body.installed_apps
        },
        { where: { monitor_id: req.params.id } });

    MonitorModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.destroy = async function (req, res) {
    await MonitorModel.destroy(
        { where: { monitor_id: req.params.id } });

    MonitorModel.findAll().then((result) => res.json(result));
}