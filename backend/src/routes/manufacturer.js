const Express = require('express');
const manufacturer = require('./../controllers/manufacturer')
const auth = require('./../controllers/auth');

const routes = Express.Router()

routes.get("/", auth.logged, manufacturer.findAll);
routes.post("/", auth.logged, manufacturer.create);
routes.get("/:id", auth.logged, manufacturer.find);
routes.put("/:id", auth.logged, manufacturer.update);
routes.delete("/:id", auth.logged, manufacturer.destroy);

module.exports = routes;