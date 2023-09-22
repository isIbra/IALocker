const express = require('express');
const app = express();
const port = 3000;

// Generate a random 4-digit passcode from 0-9
function generatePasscode() {
  const passcode = Math.floor(Math.random() * 10000).toString();
  return passcode.padStart(4, '0');
}

// Create an API endpoint to send the passcode to the Arduino
app.get('/passcode', (req, res) => {
  // Generate a passcode
  const passcode = generatePasscode();

  // Respond to the request with just the passcode as a string
  res.send(passcode);
});

// Start the server
app.listen(port, '192.168.100.13', () => {
  console.log(`Express server listening at http://192.168.100.13:${port}`);
});
