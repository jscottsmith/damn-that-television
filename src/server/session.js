import expressSession from 'express-session';
import sequilzeSession from 'connect-session-sequelize';
import sequelize from 'database/sequelize.js';

// ENV
const PROD = process.env.NODE_ENV === 'production';

const SequelizeStore = sequilzeSession(expressSession.Store);

const store = new SequelizeStore({
    db: sequelize,
});

store.sync();

const sessionConfig = {
    // https://github.com/expressjs/session#options
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // One day
    },
    secure: PROD,
    store: store,
    resave: true,
    saveUninitialized: true,
};

export default expressSession(sessionConfig);
