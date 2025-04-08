
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const server = require("./routes/server");

const app = express();

const corsOptions  = {
  origin: "http://localhost:3001"
} 

app.use(cors(corsOptions))
// const port = 3000;
const port = 5001;


db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database MYSQL");
});

app.use(express.json());
app.use('/uploads', express.static('public/uploads'));


// LOGGING MIDDLEWARE
app.use((req, res, next) => {
  const now = new Date();
  console.log(`[${now}] Method: ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello W!!!");
});


app.use("/servers", server);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});