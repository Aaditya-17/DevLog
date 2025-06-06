"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class PostTag extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // PostTag belongs to one post
            PostTag.belongsTo(models.Post, {
                foreignKey: "post_id",
                as: "post",
            });

            // PostTag belongs to one tag
            PostTag.belongsTo(models.Tag, {
                foreignKey: "tag_id",
                as: "tag",
            });
        }
    }
    PostTag.init(
        {
            post_id: DataTypes.INTEGER,
            tag_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "PostTag",
        }
    );
    return PostTag;
};
