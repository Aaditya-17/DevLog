"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Post, {
                foreignKey: "user_id",
                as: "posts",
                onDelete: "CASCADE",
            });
            User.hasMany(models.Comment, {
                foreignKey: "user_id",
                as: "comments",
                onDelete: "CASCADE",
            });
            User.hasMany(models.Like, {
                foreignKey: "user_id",
                as: "likes",
                onDelete: "CASCADE",
            });
        }
    }
    User.init(
        {
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password_hash: DataTypes.STRING,
            bio: DataTypes.TEXT,
            profile_image: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
