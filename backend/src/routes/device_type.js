const Express = require('express');
const device_type = require('./../controllers/device_type')
const auth = require('./../controllers/auth');

const routes = Express.Router()

routes.get("/", auth.logged, device_type.findAll);
routes.post("/", auth.logged, device_type.create);
routes.get("/:id", auth.logged, device_type.find);
routes.put("/:id", auth.logged, device_type.update);
routes.delete("/:id", auth.logged, device_type.destroy);

module.exports = routes;