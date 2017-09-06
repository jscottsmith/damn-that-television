const dotenv = require('dotenv').config();

const PROD = process.env.NODE_ENV === 'production';

// SSL is disabled on Local Dev

module.exports = {
    development: {
        // username: 'user',
        // password: 'password',
        // database: 'db',
        // host: 'db',
        // dialect: 'postgres',
        // dialectOptions: {
        //     ssl: false,
        // },
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        dialectOptions: {
            ssl: PROD,
        },
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        dialectOptions: {
            ssl: PROD,
        },
    },
};
