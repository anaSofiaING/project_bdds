const Pelicula = require("../models/pelicula.model.js");

// Create and Save a new pelicula
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a pelicula
  const pelicula = new Pelicula({
    nombre : req.body.nombre,
    director : req.body.title,
    sinopsis : req.body.title,
    dia : req.body.contrasena,
    mes : req.body.description,
    anio : req.body.published,
    pais : req.body.description,
    puntuacion : req.body.puntuacion,
    genero: req.body.genero
  });

  // Save pelicula in the database
  Pelicula.create(pelicula, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the pelicula."
      });
    else res.send(data);
  });
};

// Retrieve all peliculas from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;
  const pais = req.query.pais;
  const lugar = req.query.lugar;
  Pelicula.getAll(title,pais,lugar, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving peliculas."
      });
    else res.send(data);
  });
};

// Find a single pelicula by Id
exports.findOne = (req, res) => {
  Pelicula.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found pelicula with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving pelicula with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published peliculas
exports.findAllPublished = (req, res) => {
  Pelicula.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving peliculas."
      });
    else res.send(data);
  });
};

// Update a pelicula identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Pelicula.updateById(
    req.params.id,
    new Pelicula(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found pelicula with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating pelicula with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a pelicula with the specified id in the request
exports.delete = (req, res) => {
  Pelicula.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found pelicula with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete pelicula with id " + req.params.id
        });
      }
    } else res.send({ message: `pelicula was deleted successfully!` });
  });
};

// Delete all peliculas from the database.
exports.deleteAll = (req, res) => {
  Pelicula.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all peliculas."
      });
    else res.send({ message: `All peliculas were deleted successfully!` });
  });
};
