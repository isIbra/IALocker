#include <WiFi.h>
#include <HTTPClient.h>
#include <EEPROM.h>

const char* ssid = "ALOMRAN";
const char* password = "Asd-12345";
const char* serverUrl = "http://192.168.100.13:3000/passcode";

String passcode = "";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to the WiFi network");

  // Set GPIO 2 (built-in LED) as an output
  pinMode(2, OUTPUT);
}

void loop() {
  // Create an HTTPClient object
  HTTPClient http;

  // Connect to the server
  http.begin(serverUrl);

  // Make a GET request
  int httpCode = http.GET();

  // Check the response code
  if (httpCode == HTTP_CODE_OK) {
    // Get the passcode from the response
    passcode = http.getString();

    // Print the passcode to the serial monitor
    Serial.println("Passcode received:");
    Serial.println(passcode);

    // Light up the built-in LED for 2 seconds (you can adjust this duration)
    digitalWrite(2, HIGH);
    delay(2000);
    digitalWrite(2, LOW);
  } else {
    Serial.print("Error receiving passcode! HTTP code: ");
    Serial.println(httpCode);
  }

  // Delay for 1 second
  delay(1000);
}
