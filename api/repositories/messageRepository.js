const models = require('../../models')

const save = async (message) => {
    let createMessage = await models.message.create(message)

    return createMessage
}

const findByAttribute = async (attribute, value) => {
    let message = await models.message.findOne({
        where: {
            [attribute]: value,
        },
    })

    return message
}

const findByID = async (id) => {
    let message = await models.message.findOne({
        where: {
            id: id,
        },
    })

    return message
}

const findAll = async (device_id) => {

    let where = {
        device_id: device_id,
    };


    let messages = await models.message.findAll({
        where,
        include: [
            {
                model: models.device,
            },
        ],
    })

    return messages
}

const update = async (message_id, message) => {
    let updateMessage = await models.message.update(message, {
        where: {
            id: message_id,
        },
    })

    return updateMessage
}

module.exports = {
    save,
    findAll,
    findByAttribute,
    findByID,
    update,
}
