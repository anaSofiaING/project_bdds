module.exports = app => {
  const pelicula = require("../controllers/pelicula.controller.js");

  var router = require("express").Router();

  // Create a new pelicula
  router.post("/", pelicula.create);

  // Retrieve all peliculas
  router.get("/", pelicula.findAll);

  // Retrieve all published peliculas
  router.get("/published", pelicula.findAllPublished);

  // Retrieve a single pelicula with id
  router.get("/:id", pelicula.findOne);

  // Update a pelicula with id
  router.put("/:id", pelicula.update);

  // Delete a pelicula with id
  router.delete("/:id", pelicula.delete);

  // Delete all peliculas
  router.delete("/", pelicula.deleteAll);

  app.use('/api/pelicula', router);
};
