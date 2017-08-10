'use strict';
module.exports = function(sequelize, DataTypes) {
    const Project = sequelize.define(
        'Project',
        {
            title: DataTypes.STRING,
            allowNull: false,
        },
        {
            content: DataTypes.STRING,
            allowNull: false,
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
