const Director = require("../models/director.model.js");

// Create and Save a new Director
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Director
  const director = new Director({
    nombre : director.nombre,
    apellido : director.apellido,
    edad : director.edad,
    obra : director.obra,
    genero : director.genero
  });

  // Save Director in the database
  Director.create(director, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Director."
      });
    else res.send(data);
  });
};

// Retrieve all Directors from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Director.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Directors."
      });
    else res.send(data);
  });
};

// Find a single Director by Id
exports.findOne = (req, res) => {
  Director.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Director with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Director with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Directors
exports.findAllPublished = (req, res) => {
  Director.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Directors."
      });
    else res.send(data);
  });
};

// Update a Director identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Director.updateById(
    req.params.id,
    new Director(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Director with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Director with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Director with the specified id in the request
exports.delete = (req, res) => {
  Director.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Director with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Director with id " + req.params.id
        });
      }
    } else res.send({ message: `Director was deleted successfully!` });
  });
};

// Delete all Directors from the database.
exports.deleteAll = (req, res) => {
  Director.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Directors."
      });
    else res.send({ message: `All Directors were deleted successfully!` });
  });
};
