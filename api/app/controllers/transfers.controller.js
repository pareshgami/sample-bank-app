const Transfers = require("../models/transfers.model.js");

// Create and Save a new Transfers
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Transfers
  const transfer = new Transfers({
    account_holder: req.body.account_holder,
    iban: req.body.iban,
    amount: req.body.amount,
    date: req.body.date,
    note: req.body.note
  });

  // Save Transfer in the database
  Transfers.create(transfer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Transfer."
      });
    else res.send(data);
  });
};

// Retrieve all Transfer from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Transfers.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Transfer."
      });
    else res.send(data);
  });
};

// Find a single Transfer by Id
exports.findOne = (req, res) => {
  Transfers.findById(req.params.uuid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Transfer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Transfer with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Transfer
exports.findAllPublished = (req, res) => {
  Transfer.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Transfer."
      });
    else res.send(data);
  });
};

// Update a Transfer identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Transfers.updateById(
    req.params.uuid,
    new Transfers(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Transfer with id ${req.params.uuid}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Transfer with id " + req.params.uuid
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Transfer with the specified id in the request
exports.delete = (req, res) => {
  Transfers.remove(req.params.uuid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Transfer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Transfer with id " + req.params.id
        });
      }
    } else res.send({ message: `Transfer was deleted successfully!` });
  });
};

// Delete all Transfer from the database.
exports.deleteAll = (req, res) => {
  Transfer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Transfer."
      });
    else res.send({ message: `All Transfer were deleted successfully!` });
  });
};
