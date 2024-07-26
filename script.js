/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data;

const accounts = [
  {
    owner: 'Muhammad Anees',
    interestRate: 0.7,
    pin: 1111,
    movements: [
      {
        id: '1',
        amount: 200,
        date: '2024-11-01T13:15:33.035Z',
      },
      {
        id: '2',
        amount: 5000,
        date: '2024-1-01T13:15:33.035Z',
      },
      {
        id: '3',
        amount: -200,
        date: '2023-11-01T13:15:33.035Z',
      },
      {
        id: '4',
        amount: 6000,
        date: '2022-10-01T13:15:33.035Z',
      },
      {
        id: '5',
        amount: -50,
        date: '2024-11-01T13:15:33.035Z',
      },
      {
        id: '6',
        amount: 10000,
        date: '2018-11-01T13:15:33.035Z',
      },
    ],
  },
  {
    owner: 'Sheroz',
    interestRate: 0.7,
    pin: 2222,
    movements: [
      {
        id: '1',
        amount: 20,
        date: '2024-11-01T13:15:33.035Z',
      },
      {
        id: '2',
        amount: 6000,
        date: '2024-01-01T13:15:33.035Z',
      },
      {
        id: '3',
        amount: -20,
        date: '2023-11-01T13:15:33.035Z',
      },
      {
        id: '4',
        amount: 30,
        date: '2022-10-01T13:15:33.035Z',
      },
      {
        id: '5',
        amount: -50,
        date: '2024-11-01T13:15:33.035Z',
      },
      {
        id: '6',
        amount: 10000,
        date: '2018-11-01T13:15:33.035Z',
      },
    ],
  },
  {
    owner: 'Khawaja Saadullah Sajjad ',
    interestRate: 0.7,
    pin: 4444,
    movements: [
      {
        id: '1',
        amount: 2000,
        date: '2024-11-01T13:15:33.035Z',
      },
      {
        id: '2',
        amount: 500,
        date: '2024-01-01T13:15:33.035Z',
      },
      {
        id: '3',
        amount: -200,
        date: '2023-11-01T13:15:33.035Z',
      },
      {
        id: '4',
        amount: 300,
        date: '2022-10-01T13:15:33.035Z',
      },
      {
        id: '5',
        amount: -50,
        date: '2024-11-01T13:15:33.035Z',
      },
      {
        id: '6',
        amount: 100,
        date: '2018-11-01T13:15:33.035Z',
      },
    ],
  },
  {
    owner: 'Ghufran Ullah',
    interestRate: 0.7,
    pin: 3333,
    movements: [
      {
        id: '1',
        amount: 200,
        date: '2024-11-01T13:15:33.035Z',
      },
      {
        id: '2',
        amount: 5000,
        date: '2024-1-01T13:15:33.035Z',
      },
      {
        id: '3',
        amount: -200,
        date: '2023-11-01T13:15:33.035Z',
      },
      {
        id: '4',
        amount: 300,
        date: '2022-10-01T13:15:33.035Z',
      },
      {
        id: '5',
        amount: -50,
        date: '2024-11-01T13:15:33.035Z',
      },
      {
        id: '6',
        amount: 1000,
        date: '2018-11-01T13:15:33.035Z',
      },
    ],
  },
];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const model = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnfloat = document.querySelector('.btn--float');

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
  let arrr = [];

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a.amount - b.amount)
    : acc.movements;

  // movs.forEach(function (mov, i) {
  //   arrr.push(mov.movements.indexOf(movs[i]));
  // });
  movs.forEach(function (mov, i) {
    // const date = new Date();
    const date = datestring(mov.date);
    type = mov.amount > 0 ? 'deposit' : 'withdrawal';
    const html = ` <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${date}</div>
          <div class="movements__value">${mov.amount}€</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
  console.log(arrr);
};

const calBalance = function (acc) {
  // console.log(acc.movements[amount]);
  acc.balance = acc.movements.reduce((acc, cur) => {
    const am = cur.amount;
    return acc + am;
  }, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

//diplay summary

const displaySummary = function (acc) {
  //deposit
  const deposit = acc.movements
    .filter(mov => mov.amount > 0)
    .reduce((acc, cur) => {
      const am = cur.amount;
      return acc + am;
    }, 0);
  //widrawal
  const widraw = acc.movements
    .filter(mov => mov.amount < 0)
    .reduce((acc, cur) => {
      const am = cur.amount;
      return acc + am;
    }, 0);
  //interest
  const interest = acc.movements
    .filter(mov => mov.amount > 0)
    .map(dep => (dep.amount * acc.interestRate) / 100)
    .filter(mov => mov >= 1)
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
    acc => acc.username.toLowerCase() === inputLoginUsername.value.toLowerCase()
  );
  if (currentaccount?.pin === Number(inputLoginPin.value)) {
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    containerApp.style.opacity = 100;
    uiChange(currentaccount);
    if (timer) clearInterval(timer);
    timer = starttimer();
  } else {
    model.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }
});
//btn transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = inputTransferAmount.value;
  const transferaccount = accounts.find(
    acc => acc.username.toLowerCase() === inputTransferTo.value.toLowerCase()
  );
  if (
    amount > 0 &&
    currentaccount.balance > amount &&
    transferaccount &&
    transferaccount.username.toLowerCase() !==
      currentaccount.username.toLowerCase()
  ) {
    inputTransferAmount.value = '';
    inputTransferTo.value = '';
    inputTransferTo.blur();
    //money

    // currentaccount.movements.push(Number(-amount));
    // transferaccount.movements.push(Number(amount));
    currentaccount.movements.push({
      id: '',
      amount: Number(-amount),
      date: new Date().toISOString(),
    });
    transferaccount.movements.push({
      id: '',
      amount: Number(amount),
      date: new Date().toISOString(),
    });
    //date

    // currentaccount.movementsDates.push(new Date().toISOString());
    // transferaccount.movementsDates.push(new Date().toISOString());
    uiChange(currentaccount);
    clearInterval(timer);
    timer = starttimer();
  }
});

//btn loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = inputLoanAmount.value;
  if (
    amount > 0 &&
    currentaccount.movements.some(mov => mov.amount >= amount * 0.1)
  ) {
    currentaccount.movements.push({
      id: '',
      amount: Number(amount),
      date: new Date().toISOString(),
    });
    uiChange(currentaccount);
    clearInterval(timer);
    timer = starttimer();
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const pin = Number(inputClosePin.value);
  const username = inputCloseUsername.value;
  if (
    username.toLowerCase() === currentaccount.username.toLowerCase() &&
    pin === currentaccount.pin
  ) {
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

btnfloat.addEventListener('click', function (e) {
  e.preventDefault();
  model.classList.add('hidden');
  overlay.classList.add('hidden');
});
overlay.addEventListener('click', function () {
  model.classList.add('hidden');
  overlay.classList.add('hidden');
});
