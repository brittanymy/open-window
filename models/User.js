const { Model, Datatypes } = require("sequelize");
const sequelize = require("../config/config");
const bcrypt = require("bcrypt");
const { beforeCreate, beforeUpdate } = require("../config/config");

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compare(loginPw, this.password);
    }
}

User.init (
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [4],
            },
        },
    },

    {
        hook: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash (
                    updatedUserData.password,
                    10
                );
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user",
    }
);

module.exports = User;