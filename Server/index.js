const express = require('express');
const router = require('./router');
const log = require('../Internals/Log');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(router);

const Recipient = app.listen(PORT, () => log('FG_GREEN','[Server] Listening on port ' + PORT));

module.exports = {
    Recipient,
    Router: router,
    Database: require('../Configuration/Database/Requests'),
};