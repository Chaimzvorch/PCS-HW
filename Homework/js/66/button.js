/*/const checkingAccount = {
    balance: 100,

    performTransaction: function (amount) {
        this.balance -= amount;
        console.log(`Transaction of ${amount} performed. THe new balance is :${this.balance}`)
    }
};*/

(function () {
    'use strict';

    let clicks = 0;

    const buttonContainer = document.querySelector('#buttonContainer');

    function createAndAttachButton() {

        const newButton = document.createElement('button');
        newButton.textContent = 1;
        newButton.style.margin = '5px';
        newButton.style.backgroundColor = 'green';

        newButton.addEventListener('click', e => {
            let current = parseInt(e.target.textContent, 10)
            e.target.textContent = ++current;
            e.stopPropagation();
        });
        buttonContainer.appendChild(newButton);

    }
    const initialButton = document.getElementById('initialButton');
    initialButton.style.color = "blue"
    initialButton.addEventListener('click', e => {
        createAndAttachButton();
        e.stopPropagation();
    }
    )
}());
