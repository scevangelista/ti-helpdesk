const PhotoModel = require("../models/photo.model");

exports.findAll = function (req, res) {
    PhotoModel.findAll().then((result) => res.json(result));
}

exports.find = function (req, res) {
    PhotoModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.findAllRevision = function (req, res) {
    PhotoModel.findAll({
        where: { revision_id: req.params.id }
    }).then((result) => res.json(result));
}

exports.create = async function (req, res) {
    await PhotoModel.create({
        url: req.body.url,
        revision_id: req.body.revision_id
    }).then((result) => res.json(result));
}

exports.update = async function (req, res) {
    await PhotoModel.update({
            url: req.body.url,
            revision_id: req.body.revision_id
        },
        { where: { photo_id: req.params.id } });

    PhotoModel.findByPk(req.params.id).then((result) => res.json(result));
}

exports.destroy = async function (req, res) {
    await PhotoModel.destroy(
        { where: { photo_id: req.params.id } });

    PhotoModel.findAll().then((result) => res.json(result));
}