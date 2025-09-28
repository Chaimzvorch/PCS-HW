let counter = document.querySelector('#counter');
let increase = document.querySelector('#increment');
let count = 0;

function increment() {
    count++;
    counter.innerHTML = count + '';

};
increase.addEventListener('click', increment);