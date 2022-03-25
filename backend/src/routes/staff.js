const Express = require('express');
const staff = require('./../controllers/staff')
const auth = require('./../controllers/auth');

const routes = Express.Router()

routes.get("/", auth.logged, staff.findAll);
routes.post("/", auth.logged, staff.create);
routes.get("/:id", auth.logged, staff.find);
routes.put("/:id", auth.logged, staff.update);
routes.patch("/:id", auth.logged, staff.updatePassword);
routes.delete("/:id", auth.logged, staff.destroy);

module.exports = routes;