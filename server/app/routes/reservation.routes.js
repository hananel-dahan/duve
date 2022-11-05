module.exports = app => {
  const reservations = require("../controllers/reservations.controller.js");

  var router = require("express").Router();

  // Initialize new Reservations
  router.post("/initialize", reservations.initialize);

  // Create a new Reservation
  router.post("/", reservations.create);

  // Retrieve all Reservations
  router.get("/", reservations.findAll);

  // Retrieve a single Reservation with id
  router.get("/:id", reservations.findOne);

  // Update a Reservation with id
  router.put("/:id", reservations.update);

  // Delete a Reservation with id
  router.delete("/:id", reservations.delete);

  // Create a new Reservation
  router.delete("/", reservations.deleteAll);

  app.use("/api/reservations", router);
};
