"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("PostTags", {
            post_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Posts",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            tag_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Tags",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });

        // Composite primary key
        await queryInterface.addConstraint("PostTags", {
            fields: ["post_id", "tag_id"],
            type: "primary key",
            name: "posttags_pkey",
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("PostTags");
    },
};
