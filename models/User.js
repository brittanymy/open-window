const Sequelize = require("sequelize");
const databaseConnection = require('../config/sequelizeConnection');
const bcrypt = require("bcrypt");

const User = databaseConnection.define('user', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [4],
            },
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [4],
            },
        },
    },

    {
        sequelize: databaseConnection,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user",
    }
);

User.beforeCreate(async user => {
    user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;