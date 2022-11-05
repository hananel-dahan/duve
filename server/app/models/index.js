const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = `mongodb://${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.DB_NAME}`;
db.reservation = require("./reservations.model.js")(mongoose);
module.exports = db;
 