function counterCreator() {
    const counterContainer = document.querySelector('#counterContainer');
    let counter = document.createElement('button');
    let count = 0;

    counter.style.margin = '15px';
    counter.style.backgroundColor = 'blue';

    function increment() {
        count++;
        counter.innerHTML = count + '';

    };
    counterContainer.appendChild(counter);
    counter.addEventListener('click', increment);
};
counterCreator();
counterCreator();
counterCreator();
counterCreator();