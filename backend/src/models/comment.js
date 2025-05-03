"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Comment belongs to one user
            Comment.belongsTo(models.User, {
                foreignKey: "user_id",
                as: "user",
            });

            // Comment belongs to one post
            Comment.belongsTo(models.Post, {
                foreignKey: "post_id",
                as: "post",
            });
        }
    }
    Comment.init(
        {
            post_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            content: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Comment",
        }
    );
    return Comment;
};
