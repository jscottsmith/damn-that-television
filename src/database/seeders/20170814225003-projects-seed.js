'use strict';

const projects = require('../fixtures/projects');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Projects', projects, {});
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Projects');
    },
};
