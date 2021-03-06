const express = require('express');
const consign = require('consign');
const low = require('lowdb');

const routes = express.Router();
const adapter = require('../Configuration/Database/Adapter');

const db = low(adapter);

db.defaults({
    settings: require('./models/Settings'),
    mudae: require('./models/Mudae'),
    users: {},
    muted: [],
    infractions: [],
    levelroles: {},
    starboard: [],
}).write();

routes.get('/', (_, res) => res.send(db.value()));

consign({ verbose: false })
    .include('Server/routes')
    .into(routes, db);

module.exports = routes;