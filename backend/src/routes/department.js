const Express = require('express');
const department = require('./../controllers/department')
const auth = require('./../controllers/auth');

const routes = Express.Router()

routes.get("/", auth.logged, department.findAll);
routes.post("/", auth.logged, department.create);
routes.get("/:id", auth.logged, department.find);
routes.put("/:id", auth.logged, department.update);
routes.delete("/:id", auth.logged, department.destroy);

module.exports = routes;