const Express = require('express');
const photo = require('./../controllers/photo')
const auth = require('./../controllers/auth');

const routes = Express.Router()

routes.get("/", auth.logged, photo.findAll);
routes.post("/", auth.logged, photo.create);
routes.get("/:id", auth.logged, photo.find);
routes.put("/:id", auth.logged, photo.update);
routes.delete("/:id", auth.logged, photo.destroy);

module.exports = routes;