const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

// Define routes for communication with the ESP32
app.post('/esp', (req, res) => {
  console.log('a vistor');
  const dataFromESP32 = req.body;

  console.log('Received data from ESP32:', req.body); //receing data from ESP32
  res.send('Data received successfully');
});

app.get('/esp', (req, res) => {
  //checking for esp32
  console.log('a vistor');
});

app.listen(port, '192.168.100.13', () => {
  console.log(`Express server listening at http://192.168.100.13:${port}`);
});
