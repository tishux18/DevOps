const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', (req, res) => {
  const { name, email, password, age, gender } = req.body;

  const errors = [];

  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
    errors.push('Password does not meet the required criteria.');
  }

  if (age < 1 || age > 120) {
    errors.push('Please enter a valid age.');
  }

  if (errors.length > 0) {
    res.render('index', { errors, name, email, password, age, gender });
  } else {
    const user = { name, email, age, gender };
    res.render('response', { user });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
