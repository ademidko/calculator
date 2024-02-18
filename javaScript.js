let money;

const start = function () {
    do {
        money = prompt('Ваш месячный доход?', 30000);
    } while (isNaN(money) || money === '' || money === null);
};

start();

const checkItemIncome = function (string) {
    return /^\d+$/.test(string);
};

const checkNumber = function (num) {
    return !isNaN(parseInt(num)) && isFinite(num) && num !== 0;
};

const appDate = {
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    procentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,

    asking: function () {
        if (confirm('Есть у вас дополнительный заработок?')) {
            let itemIncome, cashIncome;

            do {
                itemIncome = prompt('Какой у нас есть дополнительный заработок?', 'Таксую');
            } while (!itemIncome.trim());

            do {
                cashIncome = +prompt('Сколько в месяц зарабатываете на этом?', 10000);
            } while (!checkNumber(cashIncome));

            this.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'такси, работа, жизнь');
        this.addExpenses = addExpenses.toLowerCase().split(', ');

        this.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let expenses, amount;

            do {
                expenses = prompt('Введите обязательную статью расходов', 'Магазин');
            } while (expenses !== '') ;

            do {
                amount = +prompt('Во сколько это обойдется?', 1500);
            } while (!checkNumber(amount));

            this.expenses[expenses] = amount;
        }
    },

    getExpensesMonth: function () {
        for (const key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    },

    getBudget: function () {
        this.budgetMonth = this.budget - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },

    getTargetMonth: function () {
        return Math.ceil(this.mission / this.budgetMonth);
    },

    getStatusIncome: function () {
        return this.budgetDay >= 1200
            ? 'У вас высокий доход'
            : this.budgetDay >= 600
                ? 'У вас средний уровень дохода'
                : this.budgetDay >= 0
                    ? 'К сожалению у вас уровень дохода ниже среднего'
                    : 'Что-то пошло не так';
    },

    getInfoDeposit: function () {
        if (this.deposit) {
            do {
                this.procentDeposit = +prompt('Какой у вас годовой процент депозита?', 10);
            } while (!checkNumber(this.procentDeposit));

            do {
                this.moneyDeposit = +prompt('Какая сумма заложена?', 1000);
            } while (!checkNumber(this.moneyDeposit));
        }
    },

    calcSavedMoney: function () {
        return this.budgetMonth * this.period;
    },
};

appDate.asking();
appDate.getExpensesMonth();
appDate.getBudget();

console.log('Расходы за месяц: ' + appDate.expensesMonth);

const months = appDate.getTargetMonth();

if (months > 0) {
    console.log('Цель будет достигнута за ' + months + ' месяца');
} else {
    console.log('Цель НЕ будет достигнута');
}

console.log(appDate.getStatusIncome());

let str = 'Наша программа включает в себя: ';
for (const key in appDate) {
    str = str + key + ' ' + appDate[key] + '; ';
}

console.log(typeof appDate.addExpenses);
const addExpenses = appDate.addExpenses.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(', ');
console.log(addExpenses);