const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const db = require('./queries')
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

let savedPasscodes = ['1234', '5679', '9876', '8888']; // placeholders... also generated code from the front end will work

//temp endpoints
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.post('/addPasscode', db.addPasscode)
app.delete('/deletePasscodeById/:id', db.deletePasscodeById);
app.delete('/deletePasscodeByCode/:id', db.deletePasscodeByCode);
app.get('/passcodes', db.getPasscodes);

//sign in
app.post('/signin', db.validateSignIn);
app.post('/signin', db.validateSignIn);




// Create an API endpoint to send the passcode to the Arduino
app.get('/passcode', (req, res) => {
  // Generate a passcode
  const passcode = generatePasscode();

  // Respond to the request with just the passcode as a string
  savedPasscodes.push(passcode);
  res.send(passcode);
});

// Endpoint to check if a passcode is valid
app.get('/checkPasscode', (req, res) => {
  const enteredPasscode = req.query.passcode;

  // Check if the entered passcode is in the valid passcodes array
  const isValidPasscode = savedPasscodes.includes(enteredPasscode);

  // Respond with true or false
  res.send(isValidPasscode.toString());
});


// Passcode Generation:
function generatePasscode() {
  const passcode = Math.floor(Math.random() * 10000).toString();
  return passcode.padStart(4, '0');
}
//Passcode Checker
function passcodeChecker(passcode) {
  return savedPasscodes.find((a) => a == passcode) != null;
}

// Start the server
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
