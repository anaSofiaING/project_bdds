const Actor = require("../models/actor.model.js");

// Create and Save a new Actor
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Actor
  const actor = new Actor({
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    nacionalidad : req.body.nacionalidad,
    edad : req.body.edad,
    obras : req.body.obras,
    proyactual : req.body.proyactual
  });

  // Save Actor in the database
  Actor.create(actor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Actor."
      });
    else res.send(data);
  });
};

// Retrieve all Actors from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Actor.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Actors."
      });
    else res.send(data);
  });
};

// Find a single Actor by Id
exports.findOne = (req, res) => {
  Actor.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Actor with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Actor with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Actors
exports.findAllPublished = (req, res) => {
  Actor.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Actors."
      });
    else res.send(data);
  });
};

// Update a Actor identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Actor.updateById(
    req.params.id,
    new Actor(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Actor with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Actor with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Actor with the specified id in the request
exports.delete = (req, res) => {
  Actor.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Actor with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Actor with id " + req.params.id
        });
      }
    } else res.send({ message: `Actor was deleted successfully!` });
  });
};

// Delete all Actors from the database.
exports.deleteAll = (req, res) => {
  Actor.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Actors."
      });
    else res.send({ message: `All Actors were deleted successfully!` });
  });
};
