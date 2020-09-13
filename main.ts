input.onButtonPressed(Button.A, function () {
    ESP8266.BigiotCheckServerTime()
    if (ESP8266.isLastCmdSuccessful()) {
        basic.showString("" + (ESP8266.lastServerTime()))
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
    basic.showNumber(0)
    ESP8266.connectToBigiotServer("www.bigiot.net", 8181)
    if (ESP8266.isBigiotConnected()) {
        basic.showNumber(1)
        ESP8266.BigiotCheckout("12844", "fb0b41e34")
        if (ESP8266.isLastCmdSuccessful()) {
            basic.showString("a")
        }
        ESP8266.BigiotCheckin("12844", "fb0b41e34")
        if (ESP8266.isLastCmdSuccessful()) {
            basic.showString("b")
        }
    }
}
basic.forever(function () {
    basic.pause(10000)
    ESP8266.BigiotUpdate2(
    "12844",
    "11251",
    convertToText(input.rotation(Rotation.Roll)),
    "11345",
    convertToText(input.rotation(Rotation.Pitch))
    )
})
basic.forever(function () {
    if (ESP8266.waitforCommand(1000)) {
        basic.showString(ESP8266.lastCmd())
    }
})
