"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // User has many posts
            Post.belongsTo(models.User, {
                foreignKey: "user_id",
                as: "user",
            });

            // Post has many comments
            Post.hasMany(models.Comment, {
                foreignKey: "post_id",
                as: "comments",
                onDelete: "CASCADE",
            });

            // Post has many likes
            Post.hasMany(models.Like, {
                foreignKey: "post_id",
                as: "likes",
                onDelete: "CASCADE",
            });

            // Post has many tags (many-to-many)
            Post.belongsToMany(models.Tag, {
                through: models.PostTag,
                foreignKey: "post_id",
                as: "tags",
            });
        }
    }
    Post.init(
        {
            user_id: DataTypes.INTEGER,
            title: DataTypes.STRING,
            slug: DataTypes.STRING,
            content: DataTypes.TEXT,
            cover_image: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Post",
        }
    );
    return Post;
};
