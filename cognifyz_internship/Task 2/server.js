const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Temporary storage for validated data
let userData = [];

// Serve the form on the home route
app.get('/', (req, res) => {
  res.render('index');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, email, age, gender } = req.body;
  
  // Server-side validation
  let errors = [];
  if (!name || name.trim() === '') errors.push('Name is required');
  if (!email || !validateEmail(email)) errors.push('Valid email is required');
  if (!age || isNaN(age) || age < 1 || age > 120) errors.push('Valid age is required');
  if (!gender) errors.push('Gender is required');
  
  if (errors.length > 0) {
    return res.status(400).send(`Validation errors: ${errors.join(', ')}`);
  }
  
  // Store validated data in temporary storage
  userData.push({ name, email, age, gender });
  res.render('response', { name, email, age, gender });
});

// Email validation function
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.[^<>()[\]\.,;:\s@"]{2,}))$/i;
  return re.test(String(email).toLowerCase());
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
