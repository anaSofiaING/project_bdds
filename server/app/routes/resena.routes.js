module.exports = app => {
  const resena = require("../controllers/resena.controller.js");

  var router = require("express").Router();

  // Create a new resena
  router.post("/", resena.create);

  // Retrieve all resenas
  router.get("/", resena.findAll);

  // Retrieve all published resenas
  router.get("/published", resena.findAllPublished);

  // Retrieve a single resena with id
  router.get("/:id", resena.findOne);

  // Update a resena with id
  router.put("/:id", resena.update);

  // Delete a resena with id
  router.delete("/:id", resena.delete);

  // Delete all resenas
  router.delete("/", resena.deleteAll);

  app.use('/api/resena', router);
};
