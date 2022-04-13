const Express = require('express');
const furniture = require('./../controllers/furniture')
const auth = require('./../controllers/auth');

const routes = Express.Router()

routes.get("/", auth.logged, furniture.findAll);
routes.post("/", auth.logged, furniture.create);
routes.get("/staff/:id", auth.logged, furniture.findAllStaff);
routes.get("/:id", auth.logged, furniture.find);
routes.put("/:id", auth.logged, furniture.update);
routes.delete("/:id", auth.logged, furniture.destroy);

module.exports = routes;