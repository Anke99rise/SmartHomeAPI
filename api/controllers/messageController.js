const config = require('../../config')
const MessageRepository = require('../repositories/messageRepository')
const validator = require('validator')
const translate = require('../helpers/translate')

let language = translate[config.defaultLanguage]

const createMessage = async (req, res) => {
    let { temperature, humidity,soil_moisture, device_id  } = req.body

    temperature = temperature ? temperature.toString().trim() : ''
    humidity = humidity ? humidity.toString().trim() : ''
    soil_moisture = soil_moisture ? soil_moisture.toString().trim() : ''
    device_id = device_id ? device_id.toString().trim() : ''

    let errors = {
        temperature: [],
        humidity: [],
        soil_moisture: [],
        device_id: [],
    }

    if (!temperature) errors['temperature'].push(language.emptytemperature)
    if (!humidity) errors['humidity'].push(language.emptyhumidity)
    if (!device_id) errors['device_id'].push(language.emptyContent)
    if (!soil_moisture) errors['soil_moisture'].push(language.emptyContent)
    

    let hasErrors = false

    Object.keys(errors).forEach((error) => {
        if (errors[error].length > 0) {
            hasErrors = true
        }
    })

    if (hasErrors) {
        return res.status(400).json({
            errors: errors,
        })
    }

    try {
        const dataToAdd = {
            temperature,
            humidity,
            soil_moisture,
            device_id,
        }

    
        let createMessage = await MessageRepository.save(dataToAdd)

        if (!createMessage) {
            return res.status(400).json({
                message: language.insertError,
            })
        }

        return res.status(200).json({
            message: language.MessageAddedSuccessfully,
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: language.insertError,
        })
    }
}
const getMessages = async (req, res) => {
    try {
        let Messages = await MessageRepository.findAll(req.params.device_id)
        if (!Messages) {
            return res.status(400).json({
                message: language.noMessages,
            })
        }
        
        Messages = Messages.map((Message) => Message.toJSON())

        return res.status(200).json({
            Messages: Messages,
        })
    } catch (err) {
        return res.status(500).json({
             message: language.findError,
        })
    }
}
const changeMessage = async (req, res) => {
    const { message_id } = req.params
    const { temperature, soil_moisture, device_id, humidity } = req.body

    let errors = {
        temperature: [],
        humidity: [],
        soil_moisture: [],
        device_id: [],
    }

    if (!temperature) errors['temperature'].push(language.emptytemperature)
    if (!humidity) errors['humidity'].push(language.emptyhumidity)
    if (!device_id) errors['device_id'].push(language.emptydevice_id)
    if (!soil_moisture) errors['soil_moisture'].push(language.emptyContent)


    let hasErrors = false

    Object.keys(errors).forEach((error) => {
        if (errors[error].length > 0) {
            hasErrors = true
        }
    })

    if (hasErrors) {
        return res.status(400).json({
            errors: errors,
        })
    }

    try {
        let Message = await MessageRepository.findByID(message_id)

        if (!Message) {
            return res.status(400).json({
                message: language.noMessage,
            })
        }

        const dataToUpdate = {
            temperature,
            humidity,
            soil_moisture,
            device_id,
        }

        let updateMessage = await MessageRepository.update(
            message_id,
            dataToUpdate
        )

        if (!updateMessage) {
            return res.status(500).json({
                message: language.updateError,
            })
        }

        return res.status(200).json({
            message: language.MessageUpdatedSuccessfully,
        })
    } catch (err) {
        return res.status(500).json({
            message: language.updateError,
        })
    }
}

module.exports = {
    createMessage,
    getMessages,
    changeMessage,
}
