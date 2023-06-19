const Resena = require("../models/resena.model.js");

// Create and Save a new Resena
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Resena
  const resena = new Resena({
    idresena : req.body.idresena,
    idpelicula : req.body.idpelicula,
    calificacion : req.body.calificacion,
    critica : req.body.critica,
    titulo : req.body.titulo,
    idusuario : req.body.idusuario

  });

  // Save Resena in the database
  Resena.create(resena, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the resena."
      });
    else res.send(data);
  });
};

// Retrieve all resenas from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;
  const user = req.query.user;
  Resena.getAll(title,user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Resenas."
      });
    else res.send(data);
  });
};

// Find a single Resena by Id
exports.findOne = (req, res) => {
  Resena.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Resena with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Resena with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Resenas
exports.findAllPublished = (req, res) => {
  Resena.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Resenas."
      });
    else res.send(data);
  });
};

// Update a Resena identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Resena.updateById(
    req.params.id,
    new Resena(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Resena with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Resena with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Resena with the specified id in the request
exports.delete = (req, res) => {
  Resena.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Resena with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Resena with id " + req.params.id
        });
      }
    } else res.send({ message: `Resena was deleted successfully!` });
  });
};

// Delete all Resenas from the database.
exports.deleteAll = (req, res) => {
  Resena.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Resenas."
      });
    else res.send({ message: `All Resenas were deleted successfully!` });
  });
};
