const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// In-memory storage for users
let users = [];

// API Endpoints
// Home route
app.get('/', (req, res) => {
  res.render('index', { users });
});

// Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Add a new user
app.post('/api/users', (req, res) => {
  const { name, email, age, gender } = req.body;
  if (name && email && age && gender) {
    const newUser = { id: users.length + 1, name, email, age, gender };
    users.push(newUser);
    res.redirect('/');
  } else {
    res.status(400).json({ message: 'Invalid input' });
  }
});

// Update a user
app.post('/api/users/update', (req, res) => {
  const { id, name, email, age, gender } = req.body;
  const userId = parseInt(id);
  const user = users.find(u => u.id === userId);

  if (user && name && email && age && gender) {
    user.name = name;
    user.email = email;
    user.age = age;
    user.gender = gender;
    res.redirect('/');
  } else {
    res.status(400).json({ message: 'Invalid input or user not found' });
  }
});

// Delete a user
app.post('/api/users/delete', (req, res) => {
  const { id } = req.body;
  const userId = parseInt(id);
  users = users.filter(u => u.id !== userId);
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
