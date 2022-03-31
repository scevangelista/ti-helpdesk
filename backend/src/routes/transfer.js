const Express = require('express');
const transfer = require('./../controllers/transfer')
const auth = require('./../controllers/auth');

const routes = Express.Router()

routes.get("/:id", auth.logged, transfer.find);

module.exports = routes;