const addDate = {
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    getExpensesMonth: function () {
        let summ = 0;
        for (const key in this.expenses) {
            summ = summ + this.expenses[key];
        }
        return summ;
    },

    getBudget: function () {
        return this.budget - this.getExpensesMonth();
    },

    getTargetMonth: function (mission, accumulatedMonth) {
        return Math.ceil(this.mission / accumulatedMonth);
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

    expenses: {},

    asking: function () {
        for (let i = 0; i < 2; i++) {
            const expenses = prompt('Введите обязательную статью расходов');
            let amount = +prompt('Во сколько это обойдется?');
            while (isNaN(amount)) {
                amount = +prompt('Во сколько это обойдется? Укажите число!');
            }
            this.expenses[expenses] = amount;
        }
    },
};

addDate.asking();

const money = +prompt('Ваш месячный доход?');
addDate.budget = money;

let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
addDate.mission = 15000;

addExpenses.toLocaleLowerCase();
console.log(addExpenses.split(', '));
console.log(addDate.expenses);

const accumulatedMonth = addDate.getBudget();
const months = addDate.getTargetMonth(addDate.mission, accumulatedMonth);

if (months > 0) {
    console.log('Цель будет достигнута через ' + months);
} else {
    console.log('Цель НЕ будет достигнута через');
}

addDate.budgetDay = Math.floor(months / 30);
console.log(addDate.budgetDay);

const statusIncome = addDate.getStatusIncome();
console.log(statusIncome);

let str = 'Наша программа вкл. в себя: ';
for (const key in addDate) {
  str = str + key + ' ' + addDate[key] + '; ';
}

console.log(str);