const db = require("../models");
const Reservation = db.reservation;

// Initialize new Reservations
exports.initialize = (req, res) => {
    const reservation = {
      firstName: "Hananel",
      lastName: "Dahan",
      email: "hananel@gmail.com",
      phone: "0527478793",
      country: "Israel",
      assignedRoom: "room 1",
      checkIn: new Date(),
      checkOut: new Date(),
      bookingSource: "Booking.com",
    };
    const reservations = [
      reservation,
      reservation,
      reservation,
      reservation,
      reservation,
    ];
    Reservation.insertMany(reservations)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while creating the Reservation.",
        });
      });
};

// Create and Save a new Reservation
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Reservation
  const reservation = new Reservation(req.body);

  // Save Reservation in the database
  reservation
    .save(reservation)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Reservation.",
      });
    });
};

// Retrieve all Reservations from the database.
exports.findAll = (req, res) => {
  Reservation.find()
    .then((data) => {
      res.send(data.map(item => item.toJSON()));
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Reservations.",
      });
    });
};

// Find a single Reservation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Reservation.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Reservation with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Reservation with id=" + id });
    });
};

// Update a Reservation by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Reservation.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Reservation with id=${id}. Maybe Reservation was not found!`,
        });
      } else res.send({ message: "Reservation was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Reservation with id=" + id,
      });
    });
};

// Delete a Reservation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Reservation.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Reservation with id=${id}. Maybe Reservation was not found!`,
        });
      } else {
        res.send({
          message: "Reservation was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Reservation with id=" + id,
      });
    });
};

// Delete all Reservations from the database.
exports.deleteAll = (req, res) => {
  Reservation.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Reservations were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all reservations.",
      });
    });
};
