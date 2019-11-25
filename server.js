const express = require("express");

// connectdb function
const connectDB = require("./config/db");

const path = require("path");

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

// Init middleware
// allows you to accept body data e.g req.body
app.use(express.json({ extended: false }));

// DEFINE OUR ROUTES
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
