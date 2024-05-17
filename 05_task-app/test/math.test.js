const { calc } = require('../config/math');

test('Calc should be equal', () => {
    const amount = calc(10, .2)

    if(amount !== 12){
        return new Error(`Total amount should be 12 but a Got : ${amount}`)
    }
})