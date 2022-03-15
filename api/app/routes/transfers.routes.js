module.exports = app => {
  const transfer = require("../controllers/transfers.controller.js");

  var router = require("express").Router();

  // Create a new Transfer
  router.post("/", transfer.create);

  // Retrieve all transfer
  router.get("/", transfer.findAll);

  // Retrieve a single Transfer with id
  router.get("/:uuid", transfer.findOne);

  // Update a Transfer with id
  router.put("/:uuid", transfer.update);

  // Delete a Transfer with id
  router.delete("/:uuid", transfer.delete);

  app.use('/api/transfers', router);
};
