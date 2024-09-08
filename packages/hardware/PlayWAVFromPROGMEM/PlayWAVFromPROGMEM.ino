#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>
#include "AudioFileSourcePROGMEM.h"
#include "AudioGeneratorWAV.h"
#include "AudioOutputI2SNoDAC.h"

// Include your audio files
#include "ten.h"
#include "thirty.h"

const char* ssid = "JioFiber2.4Ghz";
const char* password = "12345678";

ESP8266WebServer server(80);

AudioGeneratorWAV *wav;
AudioFileSourcePROGMEM *file;
AudioOutputI2SNoDAC *out;

#define LED_2 D2;  // ESP8266 built-in LED
#define LED_1 D0 ;      // D0 port
#define LED D1 ;       // D1 port

unsigned long ledOffTime = 0;
int activeLed = 0;

void setup() {
  Serial.begin(115200);
  
  // Initialize LED pins
  pinMode(D2, OUTPUT);
  pinMode(D0, OUTPUT);
  pinMode(D1, OUTPUT);
  
  digitalWrite(D2, LOW);  // Turn off built-in LED initially
  digitalWrite(D0, LOW);
  digitalWrite(D1, LOW);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // Turn on built-in LED when WiFi is connected
  digitalWrite(D2, HIGH);

  // Set up the server route
  server.on("/receive_list", HTTP_POST, handleReceiveInput);

  // Start the server
  server.begin();
  Serial.println("HTTP server started");

  // Initialize audio components
  audioLogger = &Serial;
  out = new AudioOutputI2SNoDAC();
  out->SetGain(0.2);
  wav = new AudioGeneratorWAV();
}

void loop() {
  server.handleClient();
  
  if (wav->isRunning()) {
    if (!wav->loop()) wav->stop();
  }

  // Check if it's time to turn off the LED
  if (ledOffTime > 0 && millis() >= ledOffTime) {
    digitalWrite(activeLed, LOW);
    ledOffTime = 0;
    activeLed = 0;
  }
}

void handleReceiveInput() {
  if (server.hasArg("plain") == false) {
    server.send(400, "text/plain", "Body not received");
    return;
  }

  String body = server.arg("plain");
  DynamicJsonDocument doc(2048000);
  
  DeserializationError error = deserializeJson(doc, body);
  
  if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.c_str());
    server.send(400, "text/plain", "Invalid JSON");
    return;
  }

  JsonArray hexList = doc["hexList"];

  Serial.println("Received hex values:");
  for (JsonVariant value : hexList) {
    String hexValue = value.as<String>();
    Serial.println(hexValue);
    int intValue = strtol(hexValue.c_str(), NULL, 16);
    Serial.println(intValue);
    playAudio(intValue);
  }

  server.send(200, "text/plain", "Input received and audio played");
}

void playAudio(int input) {
  const unsigned char* audioData;
  size_t audioSize;

  switch (input) {
    case 16:
      audioData = ten;
      audioSize = sizeof(ten);
      digitalWrite(D0, HIGH);
      activeLed = D0;
      ledOffTime = millis() + 5000;  // Set to turn off after 5 seconds
      break;
    case 48:
      audioData = thirty;
      audioSize = sizeof(thirty);
      digitalWrite(D1, HIGH);
      activeLed = D1;
      ledOffTime = millis() + 5000;  // Set to turn off after 5 seconds
      break;
    default:
      Serial.println("Invalid input, no audio played");
      return;
  }

  if (wav->isRunning()) {
    wav->stop();
  }

  file = new AudioFileSourcePROGMEM(audioData, audioSize);
  wav->begin(file, out);
}