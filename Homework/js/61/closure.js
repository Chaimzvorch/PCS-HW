'use strict';

function CelToFar(x) {
    return (x / 5) * 9 + 32
}

console.log(CelToFar(10))
console.log(CelToFar(0))
console.log(CelToFar(26))
console.log(CelToFar(35))

function FarToCel(y) {
    return (y - 32) * 5 / 9
}

console.log(FarToCel(55))
console.log(FarToCel(15))
console.log(FarToCel(9))
console.log(FarToCel(100))

let cel = prompt("Enter a number to convert Farenheit");

alert(CelToFar(cel))

let far = prompt("Enter a number to convert Celsius");

alert(FarToCel(far))



function multiply(x, y) {
    return x * y
};

console.log(multiply(5, 10))
console.log(multiply(2, 15))
console.log(multiply(32, 12))


const getProduct = function (x, y) {
    return x * y
};

/*function getMultiplier(x, y){
    return multiply(x,y)
    }*/


console.log(getMultiplier(9, 8))

console.log(getMultiplier(7, 8))


function getMultiplier(x) {
    return function(y){
    return x *y;
}
}


console.log(getMultiplier(5)(6))