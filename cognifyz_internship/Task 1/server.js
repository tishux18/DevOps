const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the form on the home route
app.get('/', (req, res) => {
  res.render('index');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  res.render('response', { name, email });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
