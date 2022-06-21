const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
    const message = sequelize.define(
        'message',
        {
            temperature: DataTypes.STRING,
            humidity: DataTypes.STRING,
            soil_moisture: DataTypes.STRING,
            device_id: DataTypes.STRING,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    )

    message.prototype.toJSON = function () {
        return {
            id: this.id,
            temperature: this.temperature,
            humidity: this.humidity,
            soil_moisture: this.soil_moisture,
            device_id: this.device_id,
            created_at: this.created_at,
            updated_at: this.updated_at,
        }
    }

    message.beforeCreate((message) => (message.id = uuid()))

    message.associate = (models) => {
        message.belongsTo(models.device, {
            foreignKey: 'device_id',
        })
    }

    return message
}