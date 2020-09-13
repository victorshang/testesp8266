input.onButtonPressed(Button.A, function () {
    ESP8266.BigiotUpdate2(
    "12844",
    "11251",
    "123",
    "11345",
    "456"
    )
})
input.onButtonPressed(Button.B, function () {
    ESP8266.BigiotCheckServerDate(DateTimeFormat.DateTime)
    if (ESP8266.isLastCmdSuccessful()) {
        basic.showString(ESP8266.lastServerTime())
    }
})
ESP8266.connectWifi(
SerialPin.P1,
SerialPin.P2,
BaudRate.BaudRate115200,
"MERCURY_Mini",
"0987654323"
)
if (ESP8266.isWifiConnected()) {
    ESP8266.connectToBigiotServer("www.bigiot.net", 8181)
    if (ESP8266.isBigiotConnected()) {
        ESP8266.BigiotCheckout("12844", "fb0b41e34")
        ESP8266.BigiotCheckin("12844", "fb0b41e34")
        if (ESP8266.isLastCmdSuccessful()) {
            basic.showIcon(IconNames.Heart)
        }
    }
}
basic.forever(function () {
    if (ESP8266.waitforCommand(3000)) {
        basic.showString(ESP8266.lastCmd())
    }
})
basic.forever(function () {
    ESP8266.BigiotBeat()
    basic.pause(20000)
})
