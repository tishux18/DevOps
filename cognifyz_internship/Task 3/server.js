const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files (e.g., CSS) from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route to display the form
app.get('/', (req, res) => {
  res.render('index');
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender
  };
  res.render('response', { user });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
