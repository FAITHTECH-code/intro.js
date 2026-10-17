
const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Log each request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve the HTML page
app.use(express.static("public"));

// GET /
app.get("/", (req, res) => {
  res.send("My Week 2 API!");
});

// POST /user
app.post("/user", (req, res) => {
  const { name, email } = req.body || {};

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !email.trim()
  ) {
    return res.status(400).json({
      error: "Name and email are required."
    });
  }

  res.json({
    message: `Hello, ${name.trim()}!`,
    email: email.trim()
  });
});

// GET /user/:id
app.get("/user/:id", (req, res) => {
  res.json({
    message: `User ${req.params.id} profile`,
    id: req.params.id
  });
});

// Handle invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON format."
    });
  }

  next(err);
});

// Handle server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
