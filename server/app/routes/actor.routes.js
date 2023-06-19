module.exports = app => {
  const actor = require("../controllers/actor.controller.js");

  var router = require("express").Router();

  // Create a new pelicula
  router.post("/", actor.create);

  // Retrieve all actor
  router.get("/", actor.findAll);

  // Retrieve all published actor
  router.get("/published", actor.findAllPublished);

  // Retrieve a single pelicula with id
  router.get("/:id", actor.findOne);

  // Update a pelicula with id
  router.put("/:id", actor.update);

  // Delete a pelicula with id
  router.delete("/:id", actor.delete);

  // Delete all actor
  router.delete("/", actor.deleteAll);

  app.use('/api/actor', router);
};
