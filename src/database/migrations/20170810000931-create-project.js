'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Projects', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            slug: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            agency: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            role: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            site_url: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            color_primary: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('Projects');
    },
};
