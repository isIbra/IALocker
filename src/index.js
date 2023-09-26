const express = require('express');
const app = express();
const port = 3001;

let savedPasscodes = [];

// Create an API endpoint to send the passcode to the Arduino
app.get('/passcode', (req, res) => {
  // Generate a passcode
  const passcode = generatePasscode();

  // Respond to the request with just the passcode as a string
  savedPasscodes.push(passcode);
  res.send(passcode);
});

// check validity of code
app.get('/checkPasscode', (req, res) => {
  console.log('req: ', req.query.passcode);
  let isValidPasscode = passcodeChecker(req.query.passcode);

  res.send(isValidPasscode);
});
// Passcode Generation:
function generatePasscode() {
  const passcode = Math.floor(Math.random() * 10000).toString();
  return passcode.padStart(4, '0');
}
//Passcode Checker
function passcodeChecker(passcode){
  return savedPasscodes.find(a => a == passcode) != null;
}

// Start the server
app.listen(port, 'localhost', () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
