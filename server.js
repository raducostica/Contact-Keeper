const express = require("express");

// connectdb function
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

// Init middleware
// allows you to accept body data e.g req.body
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.json("hello world");
});

// DEFINE OUR ROUTES
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
