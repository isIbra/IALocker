#include <WiFi.h>
#include <HTTPClient.h>

const char *ssid = "ALOMRAN";
const char *password = "Asd-12345";
const char *serverUrl = "http://192.168.100.13:3000/esp"; // Replace with your server's local IP

const int ledPin = 2; // GPIO pin connected to the built-in LED
bool ledState = LOW;

void setup()
{
    // Initialize serial communication at 115200 baud rate
    Serial.begin(115200);

    // Initialize the LED pin as an output
    pinMode(ledPin, OUTPUT);
    digitalWrite(ledPin, LOW); // Turn off the LED initially

    // Connect to Wi-Fi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
}

void loop()
{
    // Simulate temperature data (replace with actual sensor reading)
    float temperature = random(20, 30); // Simulate a temperature between 20 and 30 degrees Celsius

    // Create JSON data
    String jsonData = "{\"temperature\": " + String(temperature) + "}";

    // Send data to the server
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    int httpResponseCode = http.POST(jsonData);
    if (httpResponseCode > 0)
    {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        // Toggle the LED state after a successful request
        ledState = !ledState;
        digitalWrite(ledPin, ledState);
    }
    else
    {
        Serial.println("HTTP POST failed");
    }
    http.end();

    // Wait for a while before sending the next data (e.g., every 10 seconds)
    delay(10000);
}
