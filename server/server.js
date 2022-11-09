require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
initMongoDB();
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Duve sever." });
});

require("./app/routes/reservation.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

async function initMongoDB() {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to the database!");
  } catch (error) {
    console.log("Cannot connect to the database!", error);
      process.exit();
  }
}
