'use strict';
module.exports = function(sequelize, DataTypes) {
    const Project = sequelize.define(
        'Project',
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            classMethods: {
                associate(models) {
                    // associations can be defined here
                },
            },
        }
    );
    return Project;
};
