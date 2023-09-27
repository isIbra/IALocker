#include <WiFi.h>
#include <HTTPClient.h>
#include <EEPROM.h>
#include <Keypad.h>


// *                      WiFi Connection                          *//
const char* ssid = "ALOMRAN";
const char* password = "Asd-12345";
const char* GeneratorAPI = "http://192.168.100.13:3001/passcode";
const char* CheckerAPI = "http://192.168.100.13:3001/checkPasscode";

//*                        Keypad                                  *//
#define ROW_NUM     4 // four rows                              
#define COLUMN_NUM  3 // three columns                          
char keys[ROW_NUM][COLUMN_NUM] = {
  {'1', '2', '3'},
  {'4', '5', '6'},
  {'7', '8', '9'},
  {'*', '0', '#'}
};

byte pin_rows[ROW_NUM] = {5, 18, 17, 16}; // GPIO5, GPIO18, GPIO17, GPIO16 connect to the row pins
byte pin_column[COLUMN_NUM] = {4, 0, 2};  // GPIO4, GPIO0, GPIO2 connect to the column pins

Keypad keypad = Keypad( makeKeymap(keys), pin_rows, pin_column, ROW_NUM, COLUMN_NUM );


//*                       Passcodes                                *//
char desiredPasscode[20] = ""; // Change the size accordingly
 // Change this to your desired passcode
String passcode = "";
char enteredPasscode[5]; // Array to store entered passcode
String DB_Passcode = "";


void sendPasscodeToServer(const char* passcode) {
  HTTPClient http;

  // Build the URL with the passcode as a query parameter
  String url = CheckerAPI;
  url += "?passcode=";
  url += passcode;

  // Connect to the server
  http.begin(url);

  // Make a GET request
  int httpCode = http.GET();

  // Check the response code
  if (httpCode == HTTP_CODE_OK) {
    String response = http.getString();
    
    // Check if the response indicates a correct passcode
    if (response == "true") {
      Serial.println("Passcode Correct! Unlocking...");
      // Implement your unlocking mechanism here
      // For example, trigger a servo to unlock the device
    } else {
      Serial.println("Incorrect Passcode! Please try again.");
    }
  } else {
    Serial.print("Error checking passcode! HTTP code: ");
    Serial.println(httpCode);
  }
}

void fetchPasscode() {
  // Create an HTTPClient object
  HTTPClient http;

  // Connect to the server
  http.begin(GeneratorAPI);

  // Make a GET request
  int httpCode = http.GET();

  // Check the response code
  if (httpCode == HTTP_CODE_OK) {
    // Get the passcode from the response
    passcode = http.getString();

    // Update the desiredPasscode with the fetched passcode
    strncpy(desiredPasscode, passcode.c_str(), sizeof(desiredPasscode) - 1);
    desiredPasscode[sizeof(desiredPasscode) - 1] = '\0';

    // Print the passcode to the serial monitor
    Serial.println("Passcode received during setup:");
    Serial.println(desiredPasscode);

    // Light up the built-in LED for 2 seconds (you can adjust this duration)
    digitalWrite(2, HIGH);
    delay(2000);
    digitalWrite(2, LOW);
  } else {
    Serial.print("Error receiving passcode during setup! HTTP code: ");
    Serial.println(httpCode);
  }
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  //Passcode Array
  enteredPasscode[0] = '\0';

  //Servo

  //WiFi Connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to the WiFi network");

  // Set GPIO 2 (built-in LED) as an output
  pinMode(2, OUTPUT);

  // Fetch the passcode once during setup
  fetchPasscode();
}

void loop() {
  // Your main program logic here

  // For example, you can add code to collect the entered passcode
  char key = keypad.getKey();

  if (key) {
    // Append the key to the enteredPasscode
    strncat(enteredPasscode, &key, 1);
    Serial.print("Entered Passcode: ");
    Serial.println(enteredPasscode);

    // Check if the enteredPasscode is complete (e.g., 4 digits)
    if (strlen(enteredPasscode) >= 4) {
      // Send the entered passcode to the server for validation
      sendPasscodeToServer(enteredPasscode);

      // Reset the enteredPasscode for the next attempt
      enteredPasscode[0] = '\0';
    }
  }
}




