#include <WiFi.h>
#include <HTTPClient.h>
#include <EEPROM.h>
#include <Keypad.h>

const char* ssid = "Ibra";
const char* password = "12344321";
const char* GeneratorAPI = "http://192.168.1.51:3001/passcode";
const char* CheckerAPI = "http://192.168.1.51:3001/checkPasscode";

#define RELAY_PIN 27 // Change to GPIO pin 19 for the solenoid lock

#define ROW_NUM     4
#define COLUMN_NUM  3
char keys[ROW_NUM][COLUMN_NUM] = {
  {'1', '2', '3'},
  {'4', '5', '6'},
  {'7', '8', '9'},
  {'*', '0', '#'}
};
byte pin_rows[ROW_NUM] = {18, 5, 17, 16};
byte pin_column[COLUMN_NUM] = {4, 0, 2};
Keypad keypad = Keypad( makeKeymap(keys), pin_rows, pin_column, ROW_NUM, COLUMN_NUM );

char desiredPasscode[20] = "";
String passcode = "";
char enteredPasscode[5];

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  enteredPasscode[0] = '\0';

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to the WiFi network");
  pinMode(RELAY_PIN, OUTPUT);
  fetchPasscode();
}

void loop() {
  char key = keypad.getKey();
  if (key) {
    strncat(enteredPasscode, &key, 1);
    Serial.print("Entered Passcode: ");
    Serial.println(enteredPasscode);

    if (strlen(enteredPasscode) >= 4) {
      sendPasscodeToServer(enteredPasscode);
      enteredPasscode[0] = '\0';
    }
  }
}

void sendPasscodeToServer(const char* passcode) {
  HTTPClient http;
  String url = CheckerAPI;
  url += "?passcode=";
  url += passcode;
  http.begin(url);
  int httpCode = http.GET();

  if (httpCode == HTTP_CODE_OK) {
    String response = http.getString();
    if (response == "true") {
      digitalWrite(RELAY_PIN, HIGH); // Unlock the door
      delay(5000);
      digitalWrite(RELAY_PIN, LOW); // Lock the door
      Serial.println("Passcode Correct! Door unlocked.");
    } else {
      Serial.println("Incorrect Passcode! Please try again.");
    }
  } else {
    Serial.print("Error checking passcode! HTTP code: ");
    Serial.println(httpCode);
  }
}

void fetchPasscode() {
  HTTPClient http;
  http.begin(GeneratorAPI);
  int httpCode = http.GET();

  if (httpCode == HTTP_CODE_OK) {
    passcode = http.getString();
    strncpy(desiredPasscode, passcode.c_str(), sizeof(desiredPasscode) - 1);
    desiredPasscode[sizeof(desiredPasscode) - 1] = '\0';
    Serial.println("Passcode received during setup:");
    Serial.println(desiredPasscode);
    digitalWrite(2, HIGH);
    delay(2000);
    digitalWrite(2, LOW);
  } else {
    Serial.print("Error receiving passcode during setup! HTTP code: ");
    Serial.println(httpCode);
  }
}
