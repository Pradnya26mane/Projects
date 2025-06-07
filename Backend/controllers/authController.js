const db = require('../db');

// POST /register
exports.registerUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.execute(checkEmailQuery, [email], (err, result) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.status(500).json({ message: "Error checking email" });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.execute(insertQuery, [name, email, password], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ message: "Error registering user" });
      }

      res.status(200).json({ message: "User registered successfully", userId: result.insertId });
    });
  });
};
//
// POST /login
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.execute(query, [email], (err, result) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ message: "Error during login" });
    }

    if (result.length === 0 || result[0].password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = result[0];
    res.status(200).json({ message: "Login successful", userId: user.id });
  });
};
