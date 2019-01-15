module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        firstname: {
            type: DataTypes.TEXT,
            notEmpty: true
        },
        lastname: {
            type: DataTypes.TEXT,
            notEmpty: true
        },
        zip: {
            type: DataTypes.TEXT
        },
        phone_number: {
            type: DataTypes.TEXT
        },
        email: {
            type: DataTypes.TEXT,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    });
    return User;
};