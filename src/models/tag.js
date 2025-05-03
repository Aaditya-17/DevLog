"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Tag extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Tag has many posts through PostTag (many-to-many)
            Tag.belongsToMany(models.Post, {
                through: models.PostTag,
                foreignKey: "tag_id",
                as: "posts",
            });
        }
    }
    Tag.init(
        {
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Tag",
        }
    );
    return Tag;
};
