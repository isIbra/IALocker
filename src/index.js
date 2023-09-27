const express = require('express');
const app = express();
const port = 3001;

let savedPasscodes = ['1234', '5679', '9876']; // placeholders... also generated code from the front end will work

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
app.listen(port, '192.168.100.13', () => {
  console.log(`Express server listening at http://192.168.100.13:${port}`);
});
