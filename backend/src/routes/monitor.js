const Express = require('express');
const monitor = require('./../controllers/monitor')
const auth = require('./../controllers/auth');

const routes = Express.Router()

routes.get("/", auth.logged, monitor.findAll);
routes.post("/", auth.logged, monitor.create);
routes.get("/:id", auth.logged, monitor.find);
routes.put("/:id", auth.logged, monitor.update);
routes.delete("/:id", auth.logged, monitor.destroy);

module.exports = routes;