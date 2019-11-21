const express = require("express");
const connectDB = require("./config/db");
const app = express();

// connect database
connectDB();

// init middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ msg: "welcome to blog" });
});

// DEFINE OUR ROUTES
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => console.log(`server started on ${PORT}`));
