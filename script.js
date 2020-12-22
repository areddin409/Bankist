/*
    #                                          ######
   # #   #    # #####  #####  ###### #    #    #     # ###### #####  #####  # #    #
  #   #  ##   # #    # #    # #      #    #    #     # #      #    # #    # # ##   #
 #     # # #  # #    # #    # #####  #    #    ######  #####  #    # #    # # # #  #
 ####### #  # # #    # #####  #      # ## #    #   #   #      #    # #    # # #  # #
 #     # #   ## #    # #   #  #      ##  ##    #    #  #      #    # #    # # #   ##
 #     # #    # #####  #    # ###### #    #    #     # ###### #####  #####  # #    #

 ######                                            #    ######  ######
 #     #   ##   #    # #    # #  ####  #####      # #   #     # #     #
 #     #  #  #  ##   # #   #  # #        #       #   #  #     # #     #
 ######  #    # # #  # ####   #  ####    #      #     # ######  ######
 #     # ###### #  # # #  #   #      #   #      ####### #       #
 #     # #    # #   ## #   #  # #    #   #      #     # #       #
 ######  #    # #    # #    # #  ####    #      #     # #       #

*/

'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////

/*
 ######
 #     #   ##   #####   ##
 #     #  #  #    #    #  #
 #     # #    #   #   #    #
 #     # ######   #   ######
 #     # #    #   #   #    #
 ######  #    #   #   #    #

*/
const account1 = {
  owner: 'Andrew Reddin',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/*
 #######
 #       #      ###### #    # ###### #    # #####  ####
 #       #      #      ##  ## #      ##   #   #   #
 #####   #      #####  # ## # #####  # #  #   #    ####
 #       #      #      #    # #      #  # #   #        #
 #       #      #      #    # #      #   ##   #   #    #
 ####### ###### ###### #    # ###### #    #   #    ####

*/
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/*
 #######
 #       #    # #    #  ####  ##### #  ####  #    #  ####
 #       #    # ##   # #    #   #   # #    # ##   # #
 #####   #    # # #  # #        #   # #    # # #  #  ####
 #       #    # #  # # #        #   # #    # #  # #      #
 #       #    # #   ## #    #   #   # #    # #   ## #    #
 #        ####  #    #  ####    #   #  ####  #    #  ####

*/

////////////////////
// Display each of the deposits and withdrawals for the account
////////////////////
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type} </div>
          <div class="movements__value">$${movement}</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

////////////////////////////////
// sums up the total balance to the account and displays it
////////////////////////////////
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, movement) => acc + movement, 0);
  labelBalance.textContent = `$${acc.balance}`;
};

////////////////////
//  calcuates deposits, withdrawals, and interest and displays the totals on UI
////////////////////
const calcDisplaySummary = function ({ movements, interestRate }) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, movement) => acc + movement, 0);

  labelSumIn.textContent = `$${incomes}`;

  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, movement) => acc + movement, 0);

  labelSumOut.textContent = `$${Math.abs(out)}`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `$${interest}`;
};

////////////////////
// takes the account in as an arg then shortens the username to just initials
// ei: Andrew Reddin = owner --> ar = username;
////////////////////
const createUserName = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserName(accounts);

const updateUI = function (account) {
  //display movements
  displayMovements(account.movements);

  //display balance
  calcDisplayBalance(account);

  //display summary
  calcDisplaySummary(account);
};

/*
 #######                               #     #
 #       #    # ###### #    # #####    #     #   ##   #    # #####  #      ###### #####   ####
 #       #    # #      ##   #   #      #     #  #  #  ##   # #    # #      #      #    # #
 #####   #    # #####  # #  #   #      ####### #    # # #  # #    # #      #####  #    #  ####
 #       #    # #      #  # #   #      #     # ###### #  # # #    # #      #      #####       #
 #        #  #  #      #   ##   #      #     # #    # #   ## #    # #      #      #   #  #    #
 #######   ##   ###### #    #   #      #     # #    # #    # #####  ###### ###### #    #  ####

*/
let currentAccount;

////////////////////
//Login Verification
////////////////////
btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    account => account.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  //check pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //update UI
    updateUI(currentAccount);
  }
});

////////////////////
//Transfer Process
////////////////////
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recipient = accounts.find(
    account => account.username === inputTransferTo.value
  );
  console.log(amount, recipient);

  //check if user has enough money in account
  // & the amount they want to send is not negative
  // & they aren't sending money to themselves and the recipient exists
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    recipient?.username !== currentAccount.username
  ) {
    //Remove amount from the currentAccount
    currentAccount.movements.push(-amount);
    //add amount to recipient
    recipient.movements.push(amount);

    //update UI
    updateUI(currentAccount);
  }
  //clear input fields
  inputTransferTo.value = inputTransferAmount.value = '';
});

////////////////////
//Close Account
////////////////////
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  //check if input equals current user
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    //find account and remove it
    const index = accounts.findIndex(
      account => account.username === currentAccount.username
    );

    //delete account
    accounts.splice(index, 1);
    //hide UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

////////////////////
//Request a loan
//only grant loan if there is a deposit >= 10% of requested amount
////////////////////

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(m => m >= amount * 0.1)) {
    //add movement
    currentAccount.movements.push(amount);

    //update UI
    updateUI(currentAccount);
  }
  //clear input field
  inputLoanAmount.value = '';
});

////////////////////
//Sort Movements
////////////////////
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Notes

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const eurToUSD = 1.22;

// const movementsUSD = movements.map(movement => movement * eurToUSD);

// console.log(movements);
// console.log(movementsUSD);

// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );

// console.log(movementsDescriptions);

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(deposits);

// const withdraws = movements.filter(mov => mov < 0);
// console.log(deposits);
// console.log(withdraws);

////accumlator -> SNOWBALL
////0 = the initial value of the accumlator
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);

// console.log(movements);
// console.log(balance);

////Maximum Value
// const max = movements.reduce((acc, cur) => {
//   if (acc > cur) return acc;
//   else return cur;
// }, movements[0]);
// console.log(max);

// const eurToUSD = 1.22;

// // PIPELINE
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map((mov, i, arr) => {
//     // console.log(arr);
//     return mov * eurToUSD;
//   })
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositsUSD);

// const firstWithdrawal = movements.find(mov => mov < 0);

// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

// const account = accounts.find(account => account.owner === 'Andrew Reddin');
// console.log(account);

////Some Method
// console.log(movements);
// //Equality
// console.log(movements.includes(-130));

// //Condition
// console.log(movements.some(movement => movement === -130)); //->> true
// const anyDespoits = movements.some(movement => movement > 500); //--> true
// console.log(anyDespoits);

// //Every Method
// console.log(movements.every(movement => movement > 0)); //--> false
// console.log(account4.movements.every(movement => movement > 0)); //--> true

// //Separate Callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// //Nested Arrays
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8, 9];
// console.log(arr.flat()); //-->[1, 2, 3, 4, 5, 6, 7, 8, 9]

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8, 9];
// console.log(arrDeep.flat()); // --> [Array(2), 3, 4, Array(2), 7, 8, 9]
// console.log(arrDeep.flat(2)); //-->[1, 2, 3, 4, 5, 6, 7, 8, 9]

// //flat
// const overallBalance = accounts
//   .map(account => account.movements)
//   .flat()
//   .reduce((acc, movement) => acc + movement, 0);
// console.log(overallBalance);

// //flatMap (only 1 level deep)
// const overallBalance2 = accounts
//   .flatMap(account => account.movements)
//   .reduce((acc, movement) => acc + movement, 0);
// console.log(overallBalance2);

// //Sorting strings
// const owners = ['Andrew', 'Zach', 'Eric', 'Billy'];
// console.log(owners.sort()); //--> mutates the original array

// //Sorting numbers
// console.log(movements); //--> [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(movements.sort()); // --> [-130, -400, -650, 1300, 200, 3000, 450, 70] OH NOOOOO! sorting based on strings

// //return < 0, A, B (keep order)
// //return > 0, A, B (switch order)
// // a-b ascending order
// console.log(movements.sort((a, b) => a - b)); // --> [-650, -400, -130, 70, 200, 450, 1300, 3000]
// // b-a descending order
// console.log(movements.sort((a, b) => b - a)); // --> [3000, 1300, 450, 200, 70, -130, -400, -650]
