'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('device', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING(191),
            },
            description: {
                type: Sequelize.STRING(191),
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                default: false
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
        return queryInterface.dropTable('device')
    },
}
