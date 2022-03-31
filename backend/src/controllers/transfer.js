const TransferModel = require("../models/transfer.model");

exports.create = async function (device_id, old_staff_id, new_staff_id) {
    const transfer = await TransferModel.create({
        device_id: device_id,
        old_staff_id: old_staff_id,
        new_staff_id: new_staff_id
    });

    return (transfer.device_id == device_id)? true : false;
}

exports.find = async function (req, res)
{
    TransferModel.findAll({
        where: [
            { device_id: req.params.id }
        ],
        order: [['created_at', 'DESC']]
    }).then((result) => res.json(result));
}