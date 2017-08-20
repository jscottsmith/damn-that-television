'use strict';
module.exports = function(sequelize, DataTypes) {
    const Project = sequelize.define(
        'Project',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            agency: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            site_url: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            color_primary: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }
        // {
        //     classMethods: {
        //         associate(models) {
        //             // associations can be defined here
        //         },
        //     },
        // }
    );
    return Project;
};
