const calc = (amount, tipsPer) => {
    const tip = amount * tipsPer;
    return amount + tip;
}

module.exports = { calc }