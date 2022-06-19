const { Model, Datatypes } = require("sequelize");
const sequelize = require("../config/config");

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_text: {
            type: Datatypes.TEXT,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
        user_id: {
            type: Datatypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
        post_id: {
            type: Datatypes.INTEGER,
            references: {
                model: "post",
                key: "id",
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "comment",
    }
);

module.exports = Comment;