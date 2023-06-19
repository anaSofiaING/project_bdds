module.exports = app => {
  const elenco = require("../controllers/elenco.controller.js");

  var router = require("express").Router();

  // Create a new pelicula
  router.post("/", elenco.create);

  // Retrieve all elenco
  router.get("/", elenco.findAll);

  // Retrieve all published elenco
  router.get("/published", elenco.findAllPublished);

  // Retrieve a single pelicula with id
  router.get("/:id", elenco.findOne);

  // Update a pelicula with id
  router.put("/:id", elenco.update);

  // Delete a pelicula with id
  router.delete("/:id", elenco.delete);

  // Delete all elenco
  router.delete("/", elenco.deleteAll);

  app.use('/api/elenco', router);
};
