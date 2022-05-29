input.onButtonPressed(Button.A, function () {
    if (bomb_row == 5) {
        bomb_column = bomber_column
        bomb_row = bomber_row
    }
})
input.onButtonPressed(Button.B, function () {
    control.reset()
})
let bomb_column = 0
let bomb_row = 0
let bomber_row = 0
let bomber_column = 0
let column = 0
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
for (let index = 0; index < 8; index++) {
    column = randint(0, 4)
    for (let row = 0; row <= 2; row++) {
        if (!(led.point(column, 4 - row))) {
            led.plot(column, 4 - row)
            break;
        }
    }
}
bomber_column = 0
bomber_row = 0
bomb_row = 5
basic.forever(function () {
    led.unplot(bomber_column, bomber_row)
    bomber_column = bomber_column + 1
    if (bomber_column == 5) {
        bomber_column = 0
        bomber_row = bomber_row + 1
    }
    if (led.point(bomber_column, bomber_row)) {
        for (let index = 0; index < 4; index++) {
            basic.showIcon(IconNames.No)
            basic.pause(100)
            basic.showIcon(IconNames.Sad)
            basic.pause(100)
        }
        control.reset()
    }
    led.plot(bomber_column, bomber_row)
    if (bomb_row != 5) {
        led.unplot(bomb_column, bomb_row)
        if (led.point(bomb_column, bomb_row + 1)) {
            led.unplot(bomb_column, bomb_row + 1)
            bomb_row = 5
        } else {
            bomb_row = bomb_row + 1
            led.plot(bomb_column, bomb_row)
        }
    }
    if (bomber_column == 4 && bomber_row == 4) {
        for (let index = 0; index < 4; index++) {
            basic.showIcon(IconNames.Heart)
            basic.pause(100)
            basic.showIcon(IconNames.Happy)
            basic.pause(100)
        }
        control.reset()
    }
    basic.pause(500)
})
