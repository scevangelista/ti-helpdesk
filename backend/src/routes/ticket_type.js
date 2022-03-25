const Express = require('express');
const ticket_type = require('./../controllers/ticket_type')
const auth = require('./../controllers/auth');

const routes = Express.Router()

routes.get("/", auth.logged, ticket_type.findAll);
routes.post("/", auth.logged, ticket_type.create);
routes.get("/:id", auth.logged, ticket_type.find);
routes.put("/:id", auth.logged, ticket_type.update);
routes.delete("/:id", auth.logged, ticket_type.destroy);

module.exports = routes;