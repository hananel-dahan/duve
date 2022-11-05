module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      country: String,
      assignedRoom: String,
      checkIn: Date,
      checkOut: Date,
      bookingSource: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Reservations = mongoose.model("reservations", schema);
  return Reservations;
};
