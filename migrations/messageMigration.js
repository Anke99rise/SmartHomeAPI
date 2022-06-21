'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('message', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            temperature: {
                type: Sequelize.STRING(191),
                unique: true,
            },
            humidity: {
                type: Sequelize.STRING(191),
            },
            soil_moisture: {
                type: Sequelize.STRING(191),
            },
            device_id: {
                type: Sequelize.UUID,
                references: {
                    model: 'device',
                    key: 'id',
                },
            },
            created_at: {
                type: Sequelize.DATE,
            },
            updated_at: {
                type: Sequelize.DATE,
            },
        })
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('message')
    },
}
