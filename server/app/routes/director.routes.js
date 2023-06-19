module.exports = app => {
  const director = require("../controllers/director.controller.js");

  var router = require("express").Router();

  // Create a new pelicula
  router.post("/", director.create);

  // Retrieve all director
  router.get("/", director.findAll);

  // Retrieve all published director
  router.get("/published", director.findAllPublished);

  // Retrieve a single pelicula with id
  router.get("/:id", director.findOne);

  // Update a pelicula with id
  router.put("/:id", director.update);

  // Delete a pelicula with id
  router.delete("/:id", director.delete);

  // Delete all director
  router.delete("/", director.deleteAll);

  app.use('/api/director', router);
};
