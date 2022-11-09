const db = require("../models");
const Reservation = db.reservation;

// Initialize new Reservations
exports.initialize = async (req, res) => {
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
  try {
    const data = await Reservation.insertMany(reservations);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Reservation.",
    });
  }
};

// Create and Save a new Reservation
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Reservation
  const reservation = new Reservation(req.body);
  try {
    // Save Reservation in the database
    const data = await reservation.save(reservation);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Reservation.",
    });
  }
};

// Retrieve all Reservations from the database.
exports.findAll = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.send(reservations.map((item) => item.toJSON()));
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving Reservations.",
    });
  }
};

// Find a single Reservation with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation)
      res.status(404).send({ message: "Not found Reservation with id " + id });
    else {
      res.send(reservation.toJSON());
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving Reservation with id=" + id,
    });
  }
};

// Update a Reservation by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  try {
    const data = await Reservation.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    if (!data) {
      res.status(404).send({
        message: `Cannot update Reservation with id=${id}. Maybe Reservation was not found!`,
      });
    } else {
      res.send({ message: "Reservation was updated successfully." });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error updating Reservation with id=" + id,
    });
  }
};

// Delete a Reservation with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Reservation.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Reservation with id=${id}. Maybe Reservation was not found!`,
      });
    } else {
      res.send({
        message: "Reservation was deleted successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Could not delete Reservation with id=" + id,
    });
  }
};

// Delete all Reservations from the database.
exports.deleteAll = async (req, res) => {
  try {
    const data = await Reservation.deleteMany({});
    res.send({
      message: `${data.deletedCount} Reservations were deleted successfully!`,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while removing all reservations.",
    });
  }
};
