const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const express = require('express');
const helmet = require('helmet');
const UsersRouter = require('./api/Users_Router.js');
const AuthRouter = require('./api/Auth_Router.js');
const restricted = require('./api/restriction-middleware.js');

const server = express();

const sessionConfig = {
    name: 'Mando',
    secret: 'thisistheway',
    cookie: {
        maxAge: 1000 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: new knexSessionStore({
        knex: require('./data/connection.js'),
        tableName: 'sessions',
        sidFieldName: 'sid',
        createTable: true,
        clearInterval: 1000 * 60
    })
}

server.use(express.json());
server.use(helmet());
server.use(session(sessionConfig));
server.use('/api/users', restricted, UsersRouter);
server.use('/api/auth', AuthRouter);

server.get('/', (req, res) => {
    res.status(200).json({api: 'up'});
})



module.exports = server;