const Express = require('express');
const auth = require('./../controllers/auth')

const routes = Express.Router()

routes.get("/", auth.verify);
routes.post("/", auth.login);
routes.delete("/", auth.destroy);

module.exports = routes;