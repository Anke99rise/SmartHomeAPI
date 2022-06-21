const models = require('../../models')

const save = async (device) => {
    let createDevice = await models.device.create(device)

    return createDevice
}

const findByAttribute = async (attribute, value) => {
    let device = await models.device.findOne({
        where: {
            [attribute]: value,
        },
    })

    return device
}

const findByID = async (id) => {
    let device = await models.device.findOne({
        where: {
            id: id,
        },
    })

    return device
}

const findAll = async () => {
    let where = {};

    let devices = await models.device.findAll({
        order: [['created_at', 'DESC']],
        where
    })

    return devices
}

const update = async (device_id, device) => {
    let updateDevice = await models.device.update(device, {
        where: {
            id: device_id,
        },
    })

    return updateDevice
}

module.exports = {
    save,
    findAll,
    findByAttribute,
    findByID,
    update,
}
