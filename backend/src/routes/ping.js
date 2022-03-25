const Express = require('express');
const ping = require('./../controllers/ping')
const auth = require('./../controllers/auth');

const routes = Express.Router()

routes.get("/", auth.logged, ping.findAll);
routes.post("/", auth.logged, ping.create);
routes.get("/:id", auth.logged, ping.find);
routes.put("/:id", auth.logged, ping.update);
routes.delete("/:id", auth.logged, ping.destroy);

module.exports = routes;