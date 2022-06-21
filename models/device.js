const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
    const device = sequelize.define(
        'device',
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            is_active: DataTypes.BOOLEAN,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    )

    device.prototype.toJSON = function () {
        return {
            id: this.id,
            name: this.title,
            description: this.description,
            is_active: this.is_active,
            created_at: this.created_at,
            updated_at: this.updated_at,
        }
    }

    device.beforeCreate((device) => (device.id = uuid()))

    return device
}
