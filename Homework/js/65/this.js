/*/const checkingAccount = {
    balance: 100,

    performTransaction: function (amount) {
        this.balance -= amount;
        console.log(`Transaction of ${amount} performed. THe new balance is :${this.balance}`)
    }
};*/

/*const savingsAccount = {
    balance: 800,

    performTransaction: function (amount) {
        this.balance += amount;
        console.log(`Transaction of ${amount} performed. THe new balance is :${this.balance}`)
    }
};*/

//checkingAccount.performTransaction(25);
//savingsAccount.performTransaction(500);

function transaction (amount) {
        this.balance += amount;
        console.log(`Transaction of ${amount} performed. THe new balance is :${this.balance}`)
    }

   /* const checkingAccount = {balance: 250};
    const savingsAccount = {balance: 500}

    transaction.call(checkingAccount,75);
    transaction.call(savingsAccount,25);
    transaction.apply(checkingAccount, [5])*/

    const savingsAccount = {balance:275};

    const depositFiftyInSavings = transaction.bind(savingsAccount, 50);

    depositFiftyInSavings();
    depositFiftyInSavings();
    depositFiftyInSavings();
