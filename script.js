/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data;
const account1 = {
  owner: 'Muhammad Anees',
  movements: [200, 450, -400, 3000, 5000, -650, -130, 70, 7000, 1300, 5000],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const account2 = {
  owner: 'Sherioz',
  movements: [5000, 3400, -150, -790, 8000, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-06-25T18:49:59.371Z',
    '2024-07-26T12:01:20.894Z',
  ],
};

const account3 = {
  owner: 'Ghufran Ullah',
  movements: [200, -200, 340, -300, 2000, -20, 50, 400, -460, 3000],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const account4 = {
  owner: 'Khawja Saadullah Sajjad',
  movements: [430, 1000, 700, 50, 90, 3000],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
  ],
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

const datestring = function (dat) {
  const date = new Date(dat);
  const year = date.getFullYear();
  const mon = `${date.getMonth() + 1}`.padStart(2, 0);
  const day = `${date.getDate()}`.padStart(2, 0);
  const hour = `${date.getHours()}`.padStart(2, 0);
  const min = `${date.getMinutes()}`.padStart(2, 0);

  return `${mon}/${day}/${year} ${hour}:${min}`;
};

//display movements
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (mov, i) {
    console.log(i);
    // const date = new Date();
    const date = datestring(acc.movementsDates[i]);
    type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${date}</div>
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

//function for timer
const starttimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
    }
    time--;
  };
  let time = 300;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
//ui-change
const uiChange = function (acc) {
  const time = datestring(new Date());
  labelDate.textContent = time;

  message(acc);
  displayMovements(acc);
  calBalance(acc);
  displaySummary(acc);
};

let currentaccount, timer;
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
    if (timer) clearInterval(timer);
    timer = starttimer();
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
    //money

    currentaccount.movements.push(Number(-amount));
    transferaccount.movements.push(Number(amount));
    //date

    currentaccount.movementsDates.push(new Date().toISOString());
    transferaccount.movementsDates.push(new Date().toISOString());
    uiChange(currentaccount);
    clearInterval(timer);
    timer = starttimer();
  }
});

//btn loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = inputLoanAmount.value;
  if (amount > 0 && currentaccount.movements.some(mov => mov >= amount * 0.1)) {
    currentaccount.movements.push(Number(amount));
    console.log(new Date().toISOString());
    currentaccount.movementsDates.push(new Date().toISOString());
    console.log(currentaccount);
    uiChange(currentaccount);
    clearInterval(timer);
    timer = starttimer();
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
  displayMovements(currentaccount, !sorted);
  sorted = !sorted;
});
