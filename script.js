/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data;
const account1 = {
  owner: 'Muhammad Anees',
  movements: [200, 450, -400, 3000, 5000, -650, -130, 70, 7000, 1300, 5000],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Sherioz',
  movements: [5000, 3400, -150, -790, 8000, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Ghufran Ullah',
  movements: [200, -200, 340, -300, 2000, -20, 50, 400, -460, 3000],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Khawja Saadullah Sajjad',
  movements: [430, 1000, 700, 50, 90, 3000],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
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
//functions

//display movements
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          
          <div class="movements__value">${mov}€</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//displaybalance

const calBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

//diplay summary

const displaySummary = function (acc) {
  //deposit
  const deposit = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  //widrawal
  const widraw = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  //interest
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(dep => (dep * acc.interestRate) / 100)
    .filter((mov, i, arr) => mov >= 1)
    .reduce((acc, cur) => acc + cur, 0);
  //change in html
  labelSumIn.textContent = `${deposit}€`;
  labelSumOut.textContent = `${Math.abs(widraw)}€`;
  labelSumInterest.textContent = `${Math.abs(interest)}€`;
};

//welecome message
const message = function (acc) {
  const msg = `Welcome ,${acc.owner}`;
  labelWelcome.textContent = msg;
};

//create username
const username = function (account) {
  account.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
username(accounts);

//ui-change
const uiChange = function (acc) {
  message(acc);
  displayMovements(acc.movements);
  calBalance(acc);
  displaySummary(acc);
};

let currentaccount;
//login button
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentaccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentaccount?.pin === Number(inputLoginPin.value)) {
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    containerApp.style.opacity = 100;
    uiChange(currentaccount);
  }
});
//btn transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = inputTransferAmount.value;
  const transferaccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  if (
    amount > 0 &&
    currentaccount.balance > amount &&
    transferaccount &&
    transferaccount.username !== currentaccount.username
  ) {
    inputTransferAmount.value = '';
    inputTransferTo.value = '';
    inputTransferTo.blur();
    currentaccount.movements.push(-amount);
    transferaccount.movements.push(amount);
    uiChange(currentaccount);
  }
});

//btn loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = inputLoanAmount.value;
  if (amount > 0 && currentaccount.movements.some(mov => mov >= amount * 0.1)) {
    currentaccount.movements.push(Number(amount));
    uiChange(currentaccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const pin = Number(inputClosePin.value);
  const username = inputCloseUsername.value;
  if (username === currentaccount.username && pin === currentaccount.pin) {
    const account = accounts.findIndex(acc => acc.username === username);
    accounts.splice(account, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }
  inputClosePin;
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentaccount.movements, !sorted);
  sorted = !sorted;
});
