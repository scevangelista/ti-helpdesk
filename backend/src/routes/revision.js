const Express = require('express');
const revision = require('./../controllers/revision')
const auth = require('./../controllers/auth');

const routes = Express.Router()

routes.get("/", auth.logged, revision.findAll);
routes.post("/", auth.logged, revision.create);
routes.get("/:id", auth.logged, revision.find);
routes.put("/:id", auth.logged, revision.update);
routes.delete("/:id", auth.logged, revision.destroy);

module.exports = routes;