const Elenco = require("../models/elenco.model.js");

// Create and Save a new Elenco
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  // Create a Elenco
  const elenco = new Elenco({
    idelenco : req.body.idelenco,
    idactor : req.body.idactor,
    idpelicula : req.body.idpelicula
  });

  // Save Elenco in the database
  Elenco.create(elenco, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Elenco."
      });
    else res.send(data);
  });
};

// Retrieve all Elencos from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Elenco.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Elencos."
      });
    else res.send(data);
  });
};

// Find a single Elenco by Id
exports.findOne = (req, res) => {
  Elenco.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Elenco with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Elenco with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Elencos
exports.findAllPublished = (req, res) => {
  Elenco.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Elencos."
      });
    else res.send(data);
  });
};

// Update a Elenco identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Elenco.updateById(
    req.params.id,
    new Elenco(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Elenco with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Elenco with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Elenco with the specified id in the request
exports.delete = (req, res) => {
  Elenco.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Elenco with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Elenco with id " + req.params.id
        });
      }
    } else res.send({ message: `Elenco was deleted successfully!` });
  });
};

// Delete all Elencos from the database.
exports.deleteAll = (req, res) => {
  Elenco.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Elencos."
      });
    else res.send({ message: `All Elencos were deleted successfully!` });
  });
};
