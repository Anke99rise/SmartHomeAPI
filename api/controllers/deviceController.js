const config = require('../../config')
const DeviceRepository = require('../repositories/deviceRepository')
const validator = require('validator')
const translate = require('../helpers/translate')

let language = translate[config.defaultLanguage]

const createDevice = async (req, res) => {
    let { name, description, is_active } = req.body

    name = name ? name.toString().trim() : ''
    description = description ? description.toString().trim() : ''

    let errors = {
        name: [],
        description: [],
        is_active: [],
    }

    if (!name) errors['name'].push(language.emptyname)
    if (!description) errors['description'].push(language.emptyContent)
    if (!validator.isBoolean(is_active.toString()))
        errors['is_active'].push(language.emptyIsActive)

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
            name,
            description,
            is_active,
        }

        let createDevice = await DeviceRepository.save(dataToAdd)

        if (!createDevice) {
            return res.status(400).json({
                message: language.insertError,
            })
        }

        return res.status(200).json({
            message: language.DeviceAddedSuccessfully,
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: language.insertError,
        })
    }
}
const getDevices = async (req, res) => {
    try {
        let devices = await DeviceRepository.findAll()

        if (!devices) {
            return res.status(400).json({
                message: language.noDevices,
            })
        }

        devices = devices.map((device) => device.toJSON())

        return res.status(200).json({
            devices: devices,
        })
    } catch (err) {
        return res.status(500).json({
            message: language.findError,
        })
    }
}
const changeDevice = async (req, res) => {
    const { device_id } = req.params
    const { name, description, is_active } = req.body

    let errors = {
        name: [],
        description: [],
        is_active: [],
    }

    if (!name) errors['name'].push(language.emptyname)
    if (!description) errors['description'].push(language.emptyContent)
    if (!validator.isBoolean(is_active.toString()))
        errors['is_active'].push(language.emptyIsActive)

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
        let device = await DeviceRepository.findByID(device_id)

        if (!device) {
            return res.status(400).json({
                message: language.noDevice,
            })
        }

        const dataToUpdate = {
            name,
            description,
            is_active,
        }

        let updateDevice = await DeviceRepository.update(
            device_id,
            dataToUpdate
        )

        if (!updateDevice) {
            return res.status(500).json({
                message: language.updateError,
            })
        }

        return res.status(200).json({
            message: language.DeviceUpdatedSuccessfully,
        })
    } catch (err) {
        return res.status(500).json({
            message: language.updateError,
        })
    }
}

module.exports = {
    createDevice,
    getDevices,
    changeDevice,
}
