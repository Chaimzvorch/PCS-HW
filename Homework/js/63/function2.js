function myEvery(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if (!callback(array[i], i, array)) {
            return false;
        }
    }
    return true;
}

function mySome(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            return true;
        }
    }
    return false;
}

function isUpperCase(letter) {
    return letter === letter.toUpperCase();
}

function isLowerCase(letter) {
    return letter === letter.toLowerCase();
}

const l1 = ['a', 'B', 'c'];
const l2 = ['A', 'B', 'c'];

console.log('testing myEvery')
console.log(myEvery(l1, isUpperCase))
console.log(myEvery(l1, isLowerCase))
console.log(myEvery(l2, isUpperCase))
console.log(myEvery(l2, isLowerCase))

console.log(mySome(l1, isLowerCase))

console.log(mySome(l1, isUpperCase))

function onlyIf(array, test, action) {
    for (let i = 0; i < array.length; i++) {
        if (test(array[i], i, array)) {
            action(array[i], i, array)
        }

    }
}

function logLetter(letter) {
    console.log(`Uppercase letter: ${letter}`);
}

const letters = ['a', 'B', 'C', 'd', 'E']
onlyIf(l1, isUpperCase, logLetter)

