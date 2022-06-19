const { Model, Datatypes } = require("sequelize");
const sequelize = require("../config/config");

class Post extends Model {}

Post.init (
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        body: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: Datatypes.INTERGER,
            references: {
                model: "user",
                key: "id",
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
    }
);

module.exports = Post;