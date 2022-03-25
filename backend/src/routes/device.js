const Express = require('express');
const device = require('./../controllers/device')
const auth = require('./../controllers/auth');

const routes = Express.Router()

routes.get("/", auth.logged, device.findAll);
routes.post("/", auth.logged, device.create);
routes.get("/:id", auth.logged, device.find);
routes.put("/:id", auth.logged, device.update);
routes.delete("/:id", auth.logged, device.destroy);

module.exports = routes;