const Express = require('express');
const activity = require('./../controllers/activity')
const auth = require('./../controllers/auth');

const routes = Express.Router()

routes.get("/", auth.logged, activity.findAll);
routes.post("/", auth.logged, activity.create);
routes.get("/:id", auth.logged, activity.find);
routes.put("/:id", auth.logged, activity.update);
routes.delete("/:id", auth.logged, activity.destroy);

module.exports = routes;