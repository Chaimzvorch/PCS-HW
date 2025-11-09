
'use strict';
const dayofWeek = (function () {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Shabbos'];

    return {
        getDayName(index) {
            return days[index - 1];
        },
        getDayNumber(day) {
            return days.findIndex(d => d === day) + 1;
        },
    };
}());

console.log(dayofWeek.getDayName(5))
console.log(dayofWeek.getDayNumber("Shabbos"))

const interestCalculator = (function () {
    let rate = 0;
    let year = 0;

    return {
        setRate(x) {
            rate = x;
            return this;
        },
        setYears(y) {
            year = y;
            return this;
        },
        calculateInterest(principal) {
            return (principal * rate * year) / 100;

        }
    };
}());
interestCalculator.setRate(2.5);
interestCalculator.setYears(3.5);
const interest = interestCalculator.calculateInterest(200);
console.log(interest)